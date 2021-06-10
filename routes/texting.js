const express = require('express')
const { getContacts } = require('../lib/socketUtils')

const router = express.Router()

const onlineUsers = {}

module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
        //ON Events
        // ON Joinning 
        socket.on('joinServer', async ({id, serverId}) => {
            if(onlineUsers[serverId]) {
                onlineUsers[serverId].push(id)
            } else {
                onlineUsers[serverId] = [id]
            }
            
            socket.join(serverId)

            const newContacts = await getContacts(serverId, onlineUsers[serverId])
            
            io.in(serverId).emit("get-contacts", { newContacts });
        });

        // socket.on("disconnect", () => {
        //     console.log("Client disconnected");
        // });
    });

    return router
};