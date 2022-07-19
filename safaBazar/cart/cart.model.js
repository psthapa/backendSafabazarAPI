const { objectID } = require('mongodb');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        default:0
    },
    price:{
        type:Number,
           
    },
    total:{
        type:Number,
      //  required:true,
    
    }
})
module.exports = mongoose.model('cart', cartSchema);