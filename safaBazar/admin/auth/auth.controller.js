const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('./../../helpers/APIError');
const config = require('../../../config/config');
const CryptoJS=require("crypto-js");
const Client = require('../../safaBazarDataModel/client');
const Org = require('../../models/org.model');


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

            if (user.userType !== 'admin' || req.body.email !== 'admin@gmail.com') {
                const err = new APIError('Authentication Failed. You donot have an access.', httpStatus.NOT_FOUND, true);
                return next(err);
            }


            if (user || req.body.email == 'safabazaradmin@gmail.com') {
                user.verifyPassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        const token = jwt.sign({
                            _id: user._id,
                            email: user.email,
                            name: user.name,
                            avatar: user.avatar
                        }, config.jwtSecret);
                        return res.json({
                            user: user,
                            token: token,
                        });
                    } else {
                        const err = new APIError('Authentication failed, Wrong email or password!', httpStatus.UNAUTHORIZED, true);
                        return next(err);

                    }
                })

            }
        })
        .catch(e => next(e));
}    


function signUp(req, res, next) {

    const user = new Client({});
    if (req.body) {
        if (req.body.name)
            user.name = req.body.name;
            if (req.body.address)
            user.address=req.body.address;
            if(req.body.pan)
            user.pan=req.body.pan;
            if (req.body.cNumber)
            user.cNumber = req.body.cNumber;
            if(req.body.cPerson)
            user.cPerson=req.body.cPerson;
        if (req.body.email)
            user.email = req.body.email;
        if (req.body.password)
            user.password = req.body.passwordCryptoJS.AES.encrypt(req.body.password, process.env.pass_sec);
        if(req.body.userType)
    user.userType=req.body.userType;
        }

    

    user.save()
        .then(user => {
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

module.exports = { login, signUp };