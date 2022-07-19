const User = require('../../safaBazarDataModel/client');
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')


function SignUp(req, res) {
    console.log("inside client signUp")
    console.log(req.body)
    const user = new User({
        name: req.body.name,
        address: req.body.address,
        pan: req.body.pan,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.pass_sec),
        otp: req.body.otp,
        cPerson: req.body.cPerson,
        cNumber: req.body.cNumber,
        email: req.body.email
    });

    user.save()
        .then((tr) => {
            const { password, ...others } = user._doc;
            (res.send(others + "sign up sucessfull"))
        })
        .catch((err) => {
            (res.send(err) + "error while signup")
        })


}

function getUsers(req, res, next) {
    console.log("inside get users")

    User.find()
        .then((user) => {
            (res.send(user))
        })
        .catch((err) => { res.send(err) });
}

module.exports = { SignUp, getUsers }