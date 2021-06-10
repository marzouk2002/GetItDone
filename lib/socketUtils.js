const Users = require('../models/Users')

async function getContacts(serverId, onlineDudes) {
    const contacts = await Users.find({ serverId : serverId }, {_id: 1, name: 1, picture: 1, role: 1})
    return contacts.map(contact => {
        const toReturn = {...contact}._doc
        toReturn.online = onlineDudes.indexOf(toReturn._id.toString()) != -1
        return toReturn
    });
}

module.exports = { getContacts }