const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

let Schema = mongoose.Schema;

/**
 * User Schema
 */
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255
    },
    mobile: {
        type: String,
        // unique: true,
        // match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
    },
    password: {
        type: String,
        select: false
    },
    address: {
        type: String
    },
    avatar: {
        type: String,
        default: 'https://s3-ap-southeast-1.amazonaws.com/timeai/avatar/img.jpg',

    },
    securityQuestion: {
        type: String
    },
    securityAnswer: {
        type: String
    },
    userType: {
        type: String
    },
    mailConfirmed: {
        type: Boolean,
        default: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    activationToken: {
        type: String,
        select: false
    },
    activationTokenExpires: {
        type: Date,
        select: false
    },
    
}, { timestamps: true }, { usePushEach: true });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

 AdminSchema.pre('save', function save(next) {
    const user = this;
    // user.profileCompletionPercent = profileCompletion(user);
    if (!user.isModified('password')) {
        return next();
    }})
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) {
//             return next(err);
//         }
//         bcrypt.hash(user.password, salt, null, (err, hash) => {
//             if (err) {
//                 return next(err);
//             }
//             user.hasPassword = true;
//             user.password = hash;
//             next();
//         });
//     });
// });
/**
 * Methods
 */

/**
 * Helper method for validating user's password.
 */
//  AdminSchema.methods.verifyPassword = function verifyPassword(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//         cb(err, isMatch);
//     });
// };




/**
 * Statics
 */
 AdminSchema.statics = {
    /**
     * Get user
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((user) => {
                if (user) {
                    return user;
                }
                const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * Verify password.
     * @param {*} candidatePassword 
     * @param {*} cb 
     */
    // verifyPassword(candidatePassword, cb) {
    //     console.log('here passowrd', candidatePassword);

    //     bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    //         console.log('result', isMatch);
    //         cb(err, isMatch);
    //     });
    // },



    /**
     * List users in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('Admin', AdminSchema);