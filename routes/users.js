const express = require('express')
const bcrypt = require('bcryptjs')
const multer = require('multer')

// pipeline
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

// models
const Users = require('../models/Users')
const Server = require('../models/Server')

const route = express.Router()

// init multer
const upload = multer();

route.post('/register', upload.single('file'), async (req, res) => {
    const body = req.body
    const file = req.file
    const errors = []

    //validation 
    const {name, role, email, password, confirm } = body
    const serverId = body?.serverId

    //Validation
    if (confirm !== password) {
        errors.push({ text: 'Sorry, passwords do not match', type: 'warning' })
    }

    if (password.length < 6) {
        errors.push({ text: 'Passwords should be at least 6 characters', type: 'warning' })
    }

    if (role !=='admin') {
        await Server.findOne({ serverId: serverId })
            .then(server => {
                if(!server) errors.push({ text: 'Server Not Found', type: 'danger' })
            })
    } else {
        await Users.findOne({ email: email })
            .then(user => {
                if(user) {
                    errors.push({ text: 'Sorry, user already registered. Try new email', type: 'danger' })
                }
            })
    }

    if(errors.length > 0) {
        return res.json({
            registered: false,
            errors
        })
    }

    // register stuf
    const newUser = new Users({name, email, role, password})

    // img stuf
    if(file) {
        const fileName = newUser.id + file.detectedFileExtension;
        await pipeline(
            file.stream,
            fs.createWriteStream(`${__dirname}/../files/users_pic/${fileName}`)
        );
        newUser.picture = '/files/users_pic/' + fileName
    }

    if(role ==='admin') {
        const newServer = new Server
        ({admin: newUser.id}) 
        newUser.serverId = newServer.id
        newServer.save()
    } else {
        newUser.serverId = serverId
    }

    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err
        console.log(newUser)
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err

            newUser.password = hash
            newUser.save()
                .then(user => {
                    const msgs = [{text: `Congratulation ${user.name}, you're now registered. try to login`, type: 'success'}]
                    return res.json({registered: true, msgs})
                })
                .catch(err => console.log(err))
        })
    })
})

module.exports = route 