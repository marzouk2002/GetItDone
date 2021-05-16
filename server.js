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

app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000

app.listen(PORT,() => console.log(`Server running on port ${PORT}`))