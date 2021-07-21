const express = require('express')
const multer = require('multer')
const utils = require('../lib/utils')
const { Branch, Comment } = require('../lib/classes')
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
    const { serverId, role, _id, name } = req.user
    const projectsFromDB = await Project.find({ serverId: serverId })
    let projects = []
    
    if(role === 'admin') {
        projects = [...projectsFromDB]
    } else {
        projects = projectsFromDB.filter( pro => {
            const isIn = pro[role + 's'].find(user => user.id ===String(_id))
            return isIn
        })
    }

    res.json({projects})
})

router.delete('/deletepro', utils.passportCheck, async (req, res) => {
    const pro_id = req.query.pro_id
    const { serverId } = req.user
    await Project.deleteOne({_id: pro_id})

    utils.deleteFromS3('servers/' + serverId + '/' + pro_id + '/')
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
    const baseName = `servers/${serverId}/${projectFolder}/`
    let filesArr = []
    await Promise.all(
        files.map(async (file) => {
            const fileName = file.originalName;
            utils.uploadToS3(fs.createReadStream(file.path), baseName+fileName)
            const extention = path.extname(fileName).toLocaleLowerCase()
            filesArr.push({path : process.env.AWS_URI + '/'+ baseName + fileName, name: fileName, extention})
        })
    );

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
        await project.save()

        // file stuf
        const path = `servers/${project.serverId}/${project._id}/${file.name}`
        utils.deleteFromS3(path)

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
        const baseName = `servers/${serverId}/${projectId}/`
        await Promise.all(
            files.map(async file => {
                const fileName = file.originalName;
                utils.uploadToS3(fs.createReadStream(file.path), baseName+fileName)
                const extention = path.extname(fileName).toLocaleLowerCase()
                filesArr.push({path : process.env.AWS_URI + '/'+ baseName + fileName, name: fileName, extention})
        }));

        const project = await Project.findById(projectId)
        project.files.unshift(...filesArr)
        await project.save()
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
        let project = await Project.findById(projectId)
        
        project.branchs.push(newBranch)
        project = utils.computateComp(project)

        await project.save()
        res.json({message: 'success'})
    }
    catch (err) {
        console.log(err)
        res.json({message: 'failed', err})
    }
})

router.delete('/branchs', utils.passportCheck, async (req, res) => {
    const { branchId, projectId } = req.body

    try {
        let project = await Project.findById(projectId)

        project.branchs = project.branchs.filter(branch => branch.id !== branchId)
        project = utils.computateComp(project)

        await project.save()
        res.json({message: 'success'})
    }
    catch (err) {
        console.log(err)
        res.json({message: 'failed', err})
    }
})

router.put('/branchs', utils.passportCheck, async (req, res) => {
    const { index, branchId, projectId } = req.body

    try {
        let project = await Project.findById(projectId)

        project.branchs = project.branchs.map((branch)=> {
            if(branch.id === branchId) {
                console.log(branch.tasks[Number(index)].status)
                branch.tasks[Number(index)].status = !branch.tasks[index].status
            }
            return branch
        })
        
        project = utils.computateComp(project)

        project.markModified("branchs")
        await project.save()
        res.json({message: 'success'})
    } 
    catch (err) {
        console.log(err)
        res.json({message: 'failed', err})
    }
})

router.post('/comments', utils.passportCheck, async (req, res) => {
    const { formInput, projectId } = req.body
    const { _id, picture, name, role } = req.user

    try {
        let project = await Project.findById(projectId)
        const newComment = new Comment(_id, picture, role, name, formInput)
        project.comments.unshift(newComment)
        
        await project.save()
        res.json({message: 'success'})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'failed', err })
    }
})

router.delete('/comments', utils.passportCheck, async (req, res) => {
    const { commentId, projectId } = req.body

    try {
        let project = await Project.findById(projectId)

        project.comments = project.comments.filter(comment => comment.id !== commentId)
        
        await project.save()
        res.json({message: 'success'})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'failed', err })
    }
})

module.exports = router