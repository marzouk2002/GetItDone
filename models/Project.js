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
        type: String,
        default: 0
    },
    managers: [String],
    developers: [String],
    files: String,
    parts: [Object],
    comments: [Object]
})

const Project = mongoose.model('projects', projectSchema)

module.exports = Project