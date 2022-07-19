const mongoose=require('mongoose');
let Schema=mongoose.Schema;
const clientBillSchema=new mongoose.Schema({
    pan:{
        type:String,
        
       clientId: {
           type: Schema.Types.ObjectId,
           ref: "clientRegister",
           required: true
       }},
       billno:{
        type:Number,
        sequence_value:5000,
        billId:{
      type:Schema.Types.ObjectId,
      ref:"Bill",
      required:true
        }   
}

})
module.exports=mongoose.model('clientBill',clientBillSchema);