const express = require('express')
const bcrypt = require('bcryptjs')
const multer = require('multer')

const route = express.Router()

route.post('/register', (req, res) => {
    const body = req.body
    const error = []

    console.log(body)
    res.json(body)
})

module.exports = route