require('dotenv').config()
const http = require('http')
const express = require('express')
const socketIo = require("socket.io");
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport');
const server = http.createServer(app)
const io = socketIo(server, { cors: { origin: "*" } });
const contentDisposition = require('content-disposition')


mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Something went wrong...\n'+err))

app.use(cors())

// Express parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// passport 
require('./config/passport')(passport);
app.use(passport.initialize());

// Users router
app.use('/users', require('./routes/users'))

// App router
app.use('/app', require('./routes/app'))

// serving files
app.use(express.static('./files', {
    setHeaders: function(res, path, stat) {
      res.set("Content-Disposition", contentDisposition(path))
    }
}))

// socket.io
const txtRoute = require('./routes/texting')(io)
app.use('/texting', txtRoute)

const PORT = process.env.PORT || 5000

server.listen(PORT,() => console.log(`Server running on port ${PORT}`))