const Users = require('../models/Users')

async function getContacts(id, serverId, onlineDudes) {
    const contacts = await Users.find({ serverId: serverId, _id: { $ne: id }}, {_id: 1, name: 1, picture: 1, role: 1})

    return contacts.map(contact => {
        const contactId = contact._id
        contact.online =  onlineDudes.findIndex(contactId) !== -1
        return contact
    });
}

module.exports = { getContacts }