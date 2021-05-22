const express = require('express')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const passport = require('passport')
const utils = require('../lib/utils')

// pipeline
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

// models DB
const Users = require('../models/Users')
const Server = require('../models/Server')

const router = express.Router()

// init multer
const upload = multer();

// token test
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

// register route
router.post('/register', upload.single('file'), async (req, res) => {
    const body = req.body
    const file = req.file
    const errors = []

    const {name, role, email, password, confirm } = body
    const serverId = body?.serverId

    //Validation
    if (confirm !== password) {
        errors.push({ text: 'Sorry, passwords do not match', type: 'warning' })
    }

    if (password.length < 6) {
        errors.push({ text: 'Passwords should be at least 6 characters', type: 'warning' })
    }
    
    Users.findOne({ email: email, role: role })
        .then(user => {
            if(user) {
                errors.push({ text: 'Sorry, user already registered. Try a new email', type: 'danger' })
            }
    })

    if (role !=='admin') {
        Server.findOne({ _id: serverId })
            .then(server => {
                if(!server) errors.push({ text: 'Server Not Found', type: 'danger' })
            })
    }

    if(errors.length > 0) {
        return res.json({
            success: false,
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
        newUser.picture = '/users_pic/' + fileName
    }

    if(role ==='admin') {
        const newServer = new Server
        ({admin: newUser.id}) 
        newUser.serverId = newServer.id
        newServer.save()
    } else {
        newUser.serverId = serverId
        const server = await Server.findOne({ _id: serverId })
        server[role+"s"].push({id: newUser.id, auth: false})
        server.save()
    }

    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err

            newUser.password = hash
            newUser.save()
                .then(user => {
                    const msgs = [{text: `Congratulation ${user.name}, you're now registered. try to login`, type: 'success'}]
                    return res.json({success: true, msgs})
                })
                .catch(err => console.log(err))
        })
    })
})

// login route
router.post('/login', upload.single('file'), async (req, res) => {
    const { email, password, role} = req.body

    try {
        const user = await Users.findOne({ email: email, role: role})
        const errors= []
        if(!user) {
            errors.push({text: 'Sorry, no user with that email!', type: 'danger'})
            return res.json({success: false, errors})
        }
        
        const isValid = await utils.validPassword(password, user.password)
        if(!isValid) {
            errors.push({text: 'Sorry, incorrect password', type: 'danger'})
            return res.json({success: false, errors})
        }

        if(role !== 'admin') {
            const server = await Server.findOne({ _id: user.serverId })
            let isAuth=null
            server[role+'s'].forEach(pers => {
                if(pers.id === user.id) {
                    isAuth = pers.auth
                }
            });
            if(!isAuth) {
                errors.push({text: "Sorry, the admin didn't accept your request yet", type: 'warning'})
                return res.json({success: false, errors})
            }
        }
        
        const tokenObject = utils.issueJWT(user);
        user.password = password
        const msgs = [{text: `Welcome ${user.name}, you are logged in`, type: 'success'}]
        return res.json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, user, msgs});
    }
    catch(err) {
        res.json({msg : 'req not resived', err: err})
    }
})

router.get('/valideToken', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({user: req.user})
})

router.post('/update', passport.authenticate('jwt', { session: false }), upload.single('file'), async (req, res) => {
    const user = req.user
    const body = req.body
    const file = req.file
    const errors = []

    const {email, password, confirm } = body

    //Validation
    if (password) {
        if (confirm !== password) {
            errors.push({ text: 'Sorry, passwords do not match', type: 'warning' })
        }
    
        if (password.length < 6) {
            errors.push({ text: 'Passwords should be at least 6 characters', type: 'warning' })
        }
    }

    if(email) {
        Users.findOne({ email: email, role: user.role })
            .then(user => {
                if(user) {
                    errors.push({ text: 'Sorry, user already registered. Try a new email', type: 'danger' })
                }
        })
    }

    if(errors.length > 0) {
        return res.json({
            success: false,
            errors
        })
    }

    if(file) {
        const fileName = user._id + file.detectedFileExtension;
        await pipeline(
            file.stream,
            fs.createWriteStream(`${__dirname}/../files/users_pic/${fileName}`)
        );
        user.picture = '/users_pic/' + fileName
    }
    Object.entries(body).map(item => {
        if(item[0]=='file' || item[0]=='confirm') return
        
        if(item[0]=='password') {
            bcrypt.genSalt(10, (err, salt) => {
                if(err) throw err
                bcrypt.hash(item[1], salt, (err, hash) => {
                    user[item[0]] = hash
                })
            })
        } else {
            user[item[0]]=item[1]
        }
    })
                   
    user.save()
        .then(user => {
            const msgs = [{text: `Congratulation ${user.name}, Everything updated.`, type: 'success'}]
            return res.json({success: true, msgs, user})
        })
        .catch(err => console.log(err))
})


router.get('/serverinfo', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { serverId } = req.user

    const server = await Server.findOne({ _id: serverId })

    requests = []
    server.developers.map(async dev => {
        const { id, auth } = dev 
        const developer = await Users.findOne({ _id: id})
        if(auth) {
            return developer
        } else {
            requests.push(developer)
            return null
        }

    }).filter(dev =>dev!==null)

    server.managers.map(async man => {
        const { id, auth } = man 
        const manager = await Users.findOne({ _id: id})
        if(auth) {
            return manager
        } else {
            requests.push(manager)
            return null
        }

    }).filter(man => man !== null)

    server.requests = requests

    res.json({server: server})
})



module.exports = router