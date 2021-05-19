const bcrypt = require('bcryptjs')
const jswebtoken = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

function validPassword(password, hash) {
    return bcrypt.compare(password, hash)
        .then(valid => {
            return valid
        })
        .catch(err=>console.log(err))
}

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