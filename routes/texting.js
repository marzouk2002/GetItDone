const express = require('express')
const { getContacts, saveMsgToDb } = require('../lib/socketUtils')

const router = express.Router()

let usersByServers = {}
let usersOnline = []

module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
        //ON Events
        // ON Joinning 
        socket.on('joinServer', async ({id, serverId}) => {
            if(usersByServers[serverId]) {
                usersByServers[serverId].push(id)
            } else {
                usersByServers[serverId] = [id]
            }
            usersOnline.push({id, serverId, socketId: socket.id})

            socket.join(serverId)

            const newContacts = await getContacts(serverId, usersByServers[serverId])
            
            io.in(serverId).emit("get-contacts", { newContacts });
        });

        // ON sending a msg  
        socket.on('send-message', async ({serverId, sentFrom, sentTo, message }) => {
            const targetUser = usersOnline.find(user => user.id === sentTo)


            const msg = await saveMsgToDb(serverId, sentFrom, sentTo, message)
            
            socket.emit("reseve-msg", {message: msg});
            if(targetUser) io.to(targetUser.socketId).emit("reseve-msg", {message: msg})
        })
        // ON disconnect
        socket.on("disconnect", async () => {
            const user = usersOnline.find(user => user.socketId === socket.id)
            
            if(user) {
                const { serverId } = user
                usersByServers[serverId] = usersByServers[serverId].filter(user_id => user_id !== user.id)
                usersOnline = usersOnline.filter(({id}) => id !== user.id)

                const newContacts = await getContacts(serverId, usersByServers[serverId])
                io.in(serverId).emit("get-contacts", { newContacts });
            }
        });
    });

    return router
};