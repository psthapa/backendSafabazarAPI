const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const billSchema = new mongoose.Schema(
    {
        pan: {
            panId:{
                type:Number
            } ,

            vendorId: {
                type: Schema.Types.ObjectId,
                ref: "vendorregister",
                required: true
            }
        },
        billno: {
            type: Number,
        },
        totalamt: {
            type: Number,
            required: true
        },
        product:[{
         productId:{
            type:Schema.Types.ObjectId,
            ref:'product'
         },
         productName:String
        ,
         qty:Number
         
        }],    
        paidamt: {
            type: Number,
            required: true

        },
        date: {
            type: Date,
            default: Date.now
        }

    }

)
module.exports = mongoose.model('billEntry', billSchema);