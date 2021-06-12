const Users = require('../models/Users')
const Server = require('../models/Server')
const { Message } = require('./classes')

async function getContacts(serverId, onlineDudes) {
    const contacts = await Users.find({ serverId : serverId }, {_id: 1, name: 1, picture: 1, role: 1})
    return contacts.map(contact => {
        const toReturn = {...contact}._doc
        toReturn.online = onlineDudes.indexOf(toReturn._id.toString()) != -1
        return toReturn
    });
}

async function saveMsgToDb(serverId, sentFrom, sentTo, message) {
    const msg = new Message(sentFrom, message)

    const server = await Server.findById(serverId)

    server.conversations
        .filter(conv => conv.between.includes(sentFrom))
        .find(conv => conv.between.includes(sentTo))
    .viewed[sentFrom] = true

    server.conversations
        .filter(conv => conv.between.includes(sentFrom))
        .find(conv => conv.between.includes(sentTo))
    .viewed[sentTo] = false

    server.conversations
        .filter(conv => conv.between.includes(sentFrom))
        .find(conv => conv.between.includes(sentTo))
        .chat.push(msg)

    server.markModified("conversations");
    await server.save()

    const toSender = await getConversations(serverId, sentFrom)
    const toResever = await getConversations(serverId, sentTo)

    return { toSender, toResever }
}

async function getConversations(serverId, userId) {
    const { conversations } = await Server.findById(serverId)

    const convToReturn =  conversations
    .filter(conv => conv.between.includes(userId))
    .map(({between, viewed, chat}) => {
        return {
            targetId: between.find(id => id !== userId),
            viewed:  viewed[userId],
            chat: chat.sort((a, b) => a-b)
        }
    })
    return convToReturn 
}


module.exports = { getContacts, getConversations, saveMsgToDb }