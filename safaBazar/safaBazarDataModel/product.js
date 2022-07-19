const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

let Schema = mongoose.Schema;
const productSchema = new mongoose.Schema(
    {
    productsId:{
   type:String
    },
        name: {
            type: String,
            // required:true
        },
        cp: {
            type: Number,
            //required:true
        },
        sp: {
            type: Number,
            //required:true
        },
        mrp: {
            type: Number,
            // required:true
        },
        uqp: {
            type: Number,
            //   required:true
        },
        bqp: {
            type: Number,
            // required:true
        },
        cat: {
            type: String,
            //required:true
        },
        qty:{
       type:Number
        },
        udate: {
            type: Date,
            default: Date.now
        },
        images: [{
            type: String,

        }],
            blog: {
                type: String
            },
        homeDelivary: {
            type: Boolean,
            default: false

        }


    })



productSchema.statics = {
    /**
     * Get user
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((product) => {
                if (product) {
                    return product;
                }
                const err = new APIError("No such product exists!", httpStatus.NOT_FOUND);
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
    },
};

module.exports = mongoose.model('product', productSchema);