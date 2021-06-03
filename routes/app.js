const express = require('express')
const multer = require('multer')
const passport = require('passport')
const utils = require('../lib/utils')
const { Branch } = require('../lib/classes')
const _ = require('lodash')

// fileSystem and pipeline ...
const fs = require("fs");
const path = require("path")
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const FileType = require('file-type');

// models DB
const Users = require('../models/Users')
const Server = require('../models/Server')
const Project = require('../models/Project')

const router = express.Router()

// init multer
const upload = multer();

router.get('/serverinfo', utils.passportCheck, async (req, res) => {
    const { serverId } = req.user
    
    let server = await Server.findOne({ _id: serverId })
    let { developers, managers } = server
    
    const requests = []

    await Promise.all(
        managers.map(async (man,i) => {
            const { id, auth } = man 
            const manager = await Users.findOne({ _id: id}, {name: 1, role: 1, email: 1})
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
            const developer = await Users.findOne({ _id: id}, {name: 1, role: 1, email: 1})
            if(auth) {
                developers[i] = developer
            } else {
                requests.push(developer)
                developers[i] = null
            }
        })
    );

    const projects = await Project.find({ serverId: serverId }, {title: 1, completion: 1})

    managers = managers.filter(man => man !== null)
    developers = developers.filter(dev => dev !== null)

    let serverInfo ={ developers, managers, requests, projects }
    serverInfo.requests = requests
    res.json({serverInfo})
})

router.get('/projects', utils.passportCheck, async (req, res)=> {
    const { serverId, role, _id } = req.user
    const projectsFromDB = await Project.find({ serverId: serverId })

    let projects = []

    if(role === 'admin') {
        projects = [...projectsFromDB]
    } else {
        projects = projectsFromDB.filter( pro => {
            const isIn = pro[role + 's'].includes(_id)
            return isIn
        })
    }

    res.json({projects})
})

router.delete('/deletepro', utils.passportCheck, async (req, res) => {
    const pro_id = req.query.pro_id
    const { serverId } = req.user
    await Project.deleteOne({_id: pro_id})

    fs.rmdir(
        path.join(__dirname, '..', 'files', 'servers', serverId, pro_id), 
        {recursive: true},
         err=> {
             if(err) return console.log(err)
             console.log('folder deleted')
         })
    res.status(200).json({msg: 'complited'})
})

router.post('/addproject', utils.passportCheck, upload.array('files', 100), async (req, res) => {
    const { _id, serverId } = req.user
    let { title, description, managers, developers } = req.body
    const files = req.files

    managers = managers.slice(1)
    developers = developers.slice(1)

    

    managers = managers.length ? managers.map(mang=> JSON.parse(mang)) : []
    developers = developers.length ? developers.map(dev=> JSON.parse(dev)) : []

    const newProject = new Project({ adminId: _id, serverId, title, description, managers, developers })


    const projectFolder = newProject.id
    const serverFolder = serverId
    const baseName = path.join('servers' , serverFolder , projectFolder)
    let filesArr = []
    fs.mkdir(path.join(__dirname, '..', 'files', baseName),{ recursive: true }, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log("New directory successfully created.")
        }
    })
    await Promise.all(
        files.map(async (file) => {
            const fileName = file.originalName;
            await pipeline(
                file.stream,
                fs.createWriteStream(path.join(__dirname, '..', 'files', baseName, fileName))
            );
            const extention = path.extname(fileName).toLocaleLowerCase()
            filesArr.push({path :path.join(baseName, fileName), name: fileName, extention})
    }));

    newProject.files = [...filesArr]
    newProject.save()
        .then(project => {
            res.json({message: 'succes'})
        })
        .catch(err => {
            console.log(err)
            res.json({err}).status(400)
        })
})

router.delete('/projectfile', utils.passportCheck, async (req, res) => {
    const { file, projectId } = req.body

    try {
        // DB stuf
        const project = await Project.findById(projectId)
        project.files = project.files.filter(fileDb => !_.isEqual(fileDb, file))
        project.save()

        // file stuf
        fs.unlinkSync(path.join(__dirname, '..', 'files', file.path))
        
        res.json({message: 'done'})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message: 'something went wrong', err})
    }

})

router.post('/projectfile', utils.passportCheck,  upload.array('files'), async (req, res) => {
    const { files } = req
    const { projectId } = req.body
    const { serverId } = req.user

    try {
        let filesArr = []
        const baseName = path.join('servers', serverId, projectId)
        await Promise.all(
            files.map(async file => {
                const fileName = file.originalName;
                await pipeline(
                    file.stream,
                    fs.createWriteStream(path.join(__dirname, '..', 'files', baseName, fileName))
                );
                const extention = path.extname(fileName).toLocaleLowerCase()
                filesArr.push({path :path.join(baseName, fileName), name: fileName, extention})
        }));

        const project = await Project.findById(projectId)
        project.files.unshift(...filesArr)
        project.save()
        res.status(200).json({message: 'success'})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'failed', err })
    }
})

router.post('/branchs', utils.passportCheck, async (req, res) => {
    const { title, description, tasks, projectId } = req.body
    const newBranch = new Branch(title, description, tasks)

    try {
        const project = await Project.findById(projectId)
        
        project.branchs.push(newBranch)

        await project.save()
        res.json({message: 'success'})
    }
    catch (err) {
        console.log(err)
        res.json({message: 'failed', err})
    }
})

module.exports = router