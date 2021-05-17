const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type : String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    picture: {
        type: String,
        default: null
    },
    role: {
        type: String,
        required: true
    },
    serverId: {
        type: String,
        required:true
    }
})

const Users = mongoose.model('users', userSchema)

module.exports = Users