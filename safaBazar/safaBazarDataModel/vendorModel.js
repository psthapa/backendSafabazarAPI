const { ObjectId } = require('mongodb');
const mongoose=require('mongoose');

let Schema = mongoose.Schema;
const vendorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{ 
        type:String,
        required:true
    },
    // products:[

    // ]
    pan: {
        // panId: {
        //     type: Schema.Types.ObjectId,
        //     ref: "Pan",
        //     required: true
        // },
        type:String,
        unique:true,
    },
    cPerson:{
        type:String,     
        required:true
    },
    cNumber: {
        type: String,
    
      },
    email:{
        type:String,
        required:true,
        unique:true
        },
    images:{
        type:String
    },
isActive:{
    type:Boolean,
    
}
    }, 
    
    {timestamps:true});
 
    module.exports=mongoose.model('vendorregister',vendorSchema);