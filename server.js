require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport');

const app = express()

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
app.use(express.static('./files'))

const PORT = process.env.PORT || 5000

app.listen(PORT,() => console.log(`Server running on port ${PORT}`))