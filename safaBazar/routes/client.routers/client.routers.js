const express = require('express');
const signUpController = require('../../controllers/clients/client.controller.signup')
const loginController = require('../../controllers/clients/client.controller.login');
// const verify=require('../../../signUp/verifyToken/verifyToken')
const router = express.Router();


router.get('/', (req, res, next) => {
    console.log("working")
})
router.post('/signup', (signUpController.SignUp));
router.get('/getusers', (signUpController.getUsers));
router.post('/login', (loginController.login));

module.exports = router;