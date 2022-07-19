const express = require('express');
const authCtrl = require('./auth.controller');

const router = express.Router();

router.route('/login')

    /** POST /api/auth/login - Returns token if correct username and password is provided */
    .post(authCtrl.login);


router.route('/signup')

    /** POST /api/auth/signup - Returns token if correct username and password is provided */
    .post(authCtrl.signUp);

module.exports = router;