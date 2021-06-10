const express = require('express')

const router = express.Router()

module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
        console.log('User has connected to Index');
        //ON Events
        socket.on('admin', function () {
            console.log('Successful Socket Test');
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected");
          });

        //End ON Events
    });

    return router
};