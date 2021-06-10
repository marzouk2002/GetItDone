const express = require('express')
const { getContacts } = require('../lib/socketUtils')

const router = express.Router()

const onlineContacts = []

module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
        //ON Events
        socket.on('admin', function () {
            console.log('Successful Socket Test');
        });

        socket.on('joinServer', (id, serverId) => {
            onlineContacts.push(id)
            socket.join(serverId)
            
            console.log(onlineContacts)
            socket.to("room1").emit("get-contacts", {contacts: getContacts(id, serverId, onlineContacts)});
        });

        socket.on("hello", () => console.log("hello"))

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });

    return router
};