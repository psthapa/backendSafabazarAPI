const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('./../../helpers/APIError');
const config = require('../../admin/config/config');
const CryptoJS = require("crypto-js");
const Client = require('../../safaBazarDataModel/client');
require('dotenv').config();


/** 
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
    Client.findOne({ email: req.body.email })
        .select('+password')
        .then(user => {
            if (!user) {
                const err = new APIError('Authentication Failed. User could not be found', httpStatus.NOT_FOUND, true);
                return next(err);
            }
            const hassedPassword = CryptoJS.AES.decrypt(user.password, process.env.pass_sec);
            const originalPassword=hassedPassword.toString(CryptoJS.enc.Utf8);  
            console.log("original password is"+ originalPassword);
            if (user.email == req.body.email && req.body.password == originalPassword) {
                const token = jwt.sign({
                    _id: user._id,
                    email: user.email,
                    name: user.name
                }, config.jwtSecret);
                return res.json({
                    user: user,
                    token: token,
                });

            }
            else {
                const err = new APIError('Authentication failed, Wrong email or password!', httpStatus.UNAUTHORIZED, true);
                return next(err);
            }

        })
        .catch(err => next(err));
        
}

function signUp(req, res, next) {
    console.log("inside signup");
    const user = new Client({});
   
    if (req.body) {
        if (req.body.name)
            console.log(req.body);
        user.name = req.body.name;
        if (req.body.address)
            user.address = req.body.address;
        if (req.body.pan)
            user.pan = req.body.pan;
        if (req.body.cNumber)
            user.cNumber = req.body.cNumber;
        if (req.body.cPerson)
            user.cPerson = req.body.cPerson;
        if (req.body.email)
            user.email = req.body.email;
        console.log(user.email);
        if (req.body.password)
            user.password = CryptoJS.AES.encrypt(req.body.password, process.env.pass_sec);
        console.log(user.password);
        
    }
console.log("before save");
    user.save()
        .then(save => {
            res.json({
                success: true,
                msg: 'Successfully registered'
            });
        })
        .catch(e => {
            if (e.errmsg && e.errmsg.indexOf('duplicate key error') != -1) {
                e = new APIError('Email already registerd', httpStatus.INTERNAL_SERVER_ERROR, true);
            }
            return next(e);

        });
}
function me(req, res, next) {
    // res.json(req.user);
    let userId = req.user._id;

    User.findOne({ _id: userId }, '_id email avatar name mobile')
        .then(user => res.json(user))
        .catch(e => next(e));
}
module.exports = { login, signUp };