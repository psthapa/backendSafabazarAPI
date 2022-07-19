// const PriceModel=require('../../safaBazarDataModel/bqp');
// const CryptoJS=require("crypto-js")
// const jwt=require('jsonwebtoken');
// const { response } = require('express');


// function addprice(req, res, next) {
//     console.log("inside admin")
// const price=new PriceModel({
//     cat:req.body.cat,
//     udate:req.body.udate,
//     image:req.body.image,
//     homeDelivary:req.body.homeDelivary
// })
// order.save()
// .then((tr)=>{(res.send(tr)+"order added sucessfully")})
// .catch((err)=>{(res.send(err))})


// }
// function getOrders(req,res,next){
//     console.log("inside get products");
//     Order.find()
//     .then((pr)=>{(console.log(pr),res.send(pr))})
//     .catch((err)=>{(res.send(err))})
// }
  
// function getOrder(req,res,next){
//     console.log("inside get products");
//     Order.find(req.params.id)
//     .then((pr)=>{(console.log(pr),res.send(pr))})
//     .catch((err)=>{(res.send(err))})
// }
  
// function deleteOrder(req,res,next){
//   console.log("inside delete user")
  
//   Order.findByIdAndDelete(req.params.id)
//    .then((product)=>{res.send(product+"deleted sucessfully")})
//       .catch((err)=>{res.send(err)})
// }  

// function updateOrder(req,res,next){
  
//     console.log("inside updation")
//     Order.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true}
//         ).then((product)=>{
//             (res.status(200).send(product+"updated sucessfully"))
//         })
//         .catch((err)=>{
//             const error="error while updating"
//             next(error)
//             (res.send(err))
//         })
    
    

// }

// module.exports={addOrder,getOrders,deleteOrder,updateOrder,getOrder}