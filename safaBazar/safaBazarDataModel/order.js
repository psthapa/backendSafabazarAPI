const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({

    product: [{
        pid: {
            type: Schema.Types.ObjectId,
            ref: "product",
            // required: true
        },
        bqp: String,
        cat: String,
        count:Number,
        cp:Number,
        mrp:Number,
        sp:Number,
        uqp:Number,
        name:String,
        productId:String,
        images:[{type:String}],
        Delivary:Boolean
    }],   
    cPerson: {
        type: String
    },
    paymentM: {
        type: String
    },
    cNumber: {
        type: String
    },
    address: {
        type: String
    },

    subTotal: {
        type: Number
    },
    amount: {
        type: Number
    },

    status: {
        type: String
    },
    remarks: {
        type: String,
    },
    orderBy: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'clientRegister',
            // required: true
        },
        name: { type: String },
        // avatar: { type: String },
        email: { type: String },
        pan:{type:Number}
    },
})
module.exports = mongoose.model('order', orderSchema);