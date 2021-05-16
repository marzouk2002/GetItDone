require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Something went wrong...\n'+err))

app.use(cors())

app.use(express.json())

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

// //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//   // Pass to next layer of middleware
//   next();
// });

app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000

app.listen(PORT,() => console.log(`Server running on port ${PORT}`))