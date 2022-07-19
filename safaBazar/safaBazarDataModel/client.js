const { objectID } = require('mongodb');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
   
    },
    address: {
        type: String,
    
    },
    pan:{
        type:String,
       
    },
    password:{
        type:String,
    
        select:false
    },
    
    otp: {
        type: String,
        
    },
    cPerson: {
        type: String,
    
    },
    cNumber: {
        type: String,
        //required: true
    },
    email: {
        type: String,
        //required:true,
        //unique:true
    }
    // isActive: {
    //     type: Boolean,
    //     default: false
    // },
    // isSaved: {
    //     type: Boolean,
    //     default: false
    // },
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    // securityQuestion: {
    //     type: String
    // },
    // securityAnswer: {
    //     type: String
    // },
    // userType: {
    //     type: String,
        
    // },
    // mailConfirmed: {
    //     type: Boolean,
    //     default: false
    // },
    // passwordResetToken: {
    //     type: String,
    //     select: false
    // },
    // passwordResetExpires: {
    //     type: Date,
    //     select: false
    // },
    // activationToken: {
    //     type: String,
    //     select: false
    // },
    // activationTokenExpires: {
    //     type: Date,
    //     select: false
    // },

})
clientSchema.statics = {
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
                const err = new APIError('No such Org exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },
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

module.exports = mongoose.model('clientRegister', clientSchema);