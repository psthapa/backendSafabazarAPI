const Joi = require('joi');

module.exports = {
    // POST /api/users
    createUser: {
        body: {
            name: Joi.string().min(1).required(),
            email: Joi.string().email().max(255).required(),
            mobile: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
        }
    },

    // UPDATE /api/users/:userId
    updateUser: {
        body: {
            name: Joi.string().required(),
            mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
        },
        params: {
            userId: Joi.string().hex().required()
        }
    },

    // POST /api/auth/login
    login: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }
};