const express = require('express')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const Users = require('../models/Users')
const Server = require('../models/Server')

const route = express.Router()

route.post('/register', (req, res) => {
    const body = req.body
    const error = []

    //validation 
    const { role, email, password, confirm } = body
    const serverId = body?.serverId

    //Validation
    if (confirm !== password) {
        errors.push({ text: 'Sorry, passwords do not match', type: 'warning' })
    }

    if (password.length < 6) {
        errors.push({ text: 'Passwords should be at least 6 characters', type: 'warning' })
    }

    if (role !=='admin') {
        Server.findOne({ serverId })
            .then(server => {
                if(!server) errors.push({ text: 'Server Not Found', type: 'danger' })
            })
    } else {
        Users.findOne({ email })
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

    res.json(body)
})

module.exports = route 
// saved for time needed
// Users.findOne({ role, email })
//     .then(user => {
//         if(user) {
//             errors.push({ text: 'Sorry, user already registered. Try new email', type: 'danger' })
//         }
//     })