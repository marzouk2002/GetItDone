const mongoose = require('mongoose')

const convSchema = mongoose.Schema({
    between: [String],
    view: Object,
    messages: [Object]
})

const Conversations = mongoose.model('conversations', convSchema)

module.exports = Conversations