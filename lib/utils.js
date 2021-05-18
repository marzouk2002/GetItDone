require('dotenv').config()
const bcrypt = require('bcryptjs')
const jswebtoken = require('jsonwebtoken')

async function validPassword(password, hash) {
    return await bcrypt.compare(password, hash)
}

const PRIV_KEY = process.env.PRIV_KEY

function issueJWT(user) {
    const _id = user._id;

    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const signedToken = jswebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

module.exports.validPassword = validPassword;
module.exports.issueJWT = issueJWT;