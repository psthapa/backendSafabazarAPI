const mongoose=require('mongoose');
let Schema=mongoose.Schema;
const bqpSchema=new mongoose.Schema(
{
cat:{
    type:String,
    required:true
},
udate:{
    type:Date,
    default:Date.now
    },
    Image:{
        type:String,
        required:true,
    blog:{
     type:URL,
     blogID:{
         type:Schema.Types.ObjectId,
         ref:"blogid",
         required:true
     }
}
    },
    homeDelivary:{
        type:Boolean,
        required:true
    }
}

)
module.exports=mongoose.model('bulkqp',bqpSchema);