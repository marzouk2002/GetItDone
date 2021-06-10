const express = require('express')
const { getContacts } = require('../lib/socketUtils')

const router = express.Router()

const onlineContacts = []

module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
        //ON Events
        // ON Joinning 
        socket.on('joinServer', async ({id, serverId}) => {
            onlineContacts.push(id)
            socket.join(serverId)

            const newContacts = await getContacts(serverId, onlineContacts)
            
            io.in(serverId).emit("get-contacts", { newContacts });
        });

        // socket.on("disconnect", () => {
        //     console.log("Client disconnected");
        // });
    });

    return router
};