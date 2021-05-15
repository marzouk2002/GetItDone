require('dotenv').config()
const express = require('express')

const app = express()

app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000

app.listen(PORT,() => console.log(`Server running on port ${PORT}...`))