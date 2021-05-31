const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    serverId: {
        type: String,
        required: true
    },
    adminId: {
        type: String,
        required: true
    },
    completion: {
        type: Number,
        default: 0
    },
    managers: [Object],
    developers: [Object],
    files: [String],
    branchs: [Object],
    comments: [Object]
})

const Project = mongoose.model('projects', projectSchema)

module.exports = Project