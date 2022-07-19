const User = require('../../safaBazarDataModel/client');
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')

function login(req, res, next) {
    console.log("inside login")
    User.findOne({ email: req.body.email }).select('+password')
        .then((user) => {

            console.log("inside then")
            console.log(user.email);
            console.log(user.password);
            const hassedPassword = CryptoJS.AES.decrypt(user.password, process.env.pass_sec);
            const originalPassword = hassedPassword.toString(CryptoJS.enc.Utf8);

            console.log(" password is")
            console.log(originalPassword)

            console.log("req password is")
            console.log(req.body.password)

            if (user.email == req.body.email && originalPassword == req.body.password) {
                console.log("before accesstoken")
                    // const{password , ...others}=  user._doc;
                const accessToken = jwt.sign({
                        id: user._id,
                        isAdmin: user.isAdmin
                    },
                    process.env.JWT_SECRET, { expiresIn: '2d' }
                )
                console.log(accessToken)
                console.log("loged in successfully")
                return res.status(200).json({ accessToken })

            } else {
                if (originalPassword !== req.body.password) {

                    const logEr = " password error"
                    return next(logEr);
                }
            }


        })
        .catch(e => {
            const errEmail = "user Email not found"
            console.log(e, "inside exception error")
            next(errEmail);
        })


}
module.exports = { login }