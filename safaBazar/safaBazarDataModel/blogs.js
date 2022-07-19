const mongoose=require('mongoose');
let Schema=mongoose.Schema;
const blogSchema=new mongoose.Schema({
    productId:{       
        type:String,
        pId:{
        type:Schema.Types.ObjectId,
        ref:"product",
      required:true
    }},
url:{
    type:URL,
    blogID:{
        type:Schema.Types.ObjectId,
        ref:"blogid",
        required:true
    }
},
title:{
    type:String,
    required:true
},
details:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now
},
Image:{
    type:String
},
count:{
    type:Number,
    
}

})
module.exports=mongoose.model('blogs',blogSchema);