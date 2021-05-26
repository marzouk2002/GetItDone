const express = require('express')
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
const Project = require('../models/Project')

const router = express.Router()

// init multer
const upload = multer();

router.get('/serverinfo', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { serverId } = req.user

    let server = await Server.findOne({ _id: serverId })
    let { developers, managers, projects } = server
    
    const requests = []

    await Promise.all(
        managers.map(async (man,i) => {
            const { id, auth } = man 
            const manager = await Users.findOne({ _id: id})
            if(auth) {
                managers[i] = manager
            } else {
                requests.push(manager)
                managers[i] = null
            }
        })
    );

    await Promise.all(
        developers.map(async (dev, i) => {
            const { id, auth } = dev 
            const developer = await Users.findOne({ _id: id})
            if(auth) {
                developers[i] = developer
            } else {
                requests.push(developer)
                developers[i] = null
            }
        })
    );

    await Promise.all(
        projects.map(async (proId, i) => {
            const project = await Project.findOne({ _id: proId})
            projects[i] = project
        })
    );

    managers = managers.filter(man => man !== null)
    developers = developers.filter(dev => dev !== null)

    let serverInfo ={ developers, managers, requests, projects }
    serverInfo.requests = requests
    res.json({serverInfo})
})


module.exports = router