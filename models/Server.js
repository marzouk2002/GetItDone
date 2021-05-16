const mongoose = require('mongoose')

const serverSchema = mongoose.Schema({
    admin: {
        type: String,
        required: true
    },
    developers: {
        type: Array,
        default: []
    },
    managers: {
        type: Array,
        default: []
    },
    projects: {
        type: Array,
        default: []
    }
})

const Server = mongoose.model('server', serverSchema)

module.exports = Server