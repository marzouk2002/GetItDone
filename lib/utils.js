require("dotenv").config()
const bcrypt = require('bcryptjs')
const jswebtoken = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

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

// AWS
const BUCKET_NAME = process.env.BUCKET_NAME;
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

let s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  Bucket: BUCKET_NAME
});

function uploadToS3(file, path) {
  s3bucket.createBucket(function () {
      var params = {
        Bucket: BUCKET_NAME,
        Key: path + file.filename,
        Body: fs.createReadStream(file.path)
      };
      s3bucket.upload(params, function (err, data) {
        if (err) {
          console.log('error in callback');
          console.log(err);
        }
        console.log('success');
        console.log(data);
      });
  });
}

function deleteFromS3(path) {
    const params = {
        Bucket: BUCKET_NAME,
        Key: path
    }
    s3bucket.deleteObject(params, function (err) {
        if (err) {
          console.log('error in callback');
          console.log(err);
        }
        console.log('success');
      })
}

module.exports.validPassword = validPassword;
module.exports.issueJWT = issueJWT;
module.exports.computateComp = computateComp;
module.exports.uploadToS3 = uploadToS3;
module.exports.passportCheck = passport.authenticate('jwt', { session: false });