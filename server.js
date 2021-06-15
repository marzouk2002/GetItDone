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


const connectionParams={
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}

mongoose.connect( process.env.DB_URI, connectionParams)
  .then( () => {
      console.log('Connected to database ')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. \n${err}`);
})

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

// static built file
if(process.env.NODE_ENV == 'production') {
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
  
  app.use(express.urlencoded({ extended: false }))
}

const PORT = process.env.PORT || 5000

server.listen(PORT,() => console.log(`Server running on port ${PORT}`))