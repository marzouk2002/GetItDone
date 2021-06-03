const bcrypt = require('bcryptjs')
const jswebtoken = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');

const passport = require('passport')
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

function validPassword(password, hash) {
    return bcrypt.compare(password, hash)
        .then(valid => valid )
        .catch(err=>console.log(err))
}

function issueJWT(user) {
    const _id = user.id;

    const expiresIn = '3d';

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

function computateComp(project) {
    const { branchs } = project
    const numBranchs = branchs.length
    let progTotal = 0

    if(numBranchs) {
        project.branchs = branchs.map(branch => {
            const { tasks } = branch
            const numTasks = tasks.length
            const numDone = tasks.reduce((total, tasks) => {
                if(tasks.status) {
                    return total+1
                } else {
                    return total
                }
            },0)
            const branchProg = Math.round((numDone / numTasks) * 100)
            branch.completion = branchProg
            progTotal+=branchProg
            return branch
        })

        project.completion = Math.round(progTotal/numBranchs)
    } else {
        project.completion = 0
    }

    return project
} 

module.exports.validPassword = validPassword;
module.exports.issueJWT = issueJWT;
module.exports.computateComp = computateComp;
module.exports.passportCheck = passport.authenticate('jwt', { session: false });