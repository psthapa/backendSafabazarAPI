const Order=require('../../safaBazarDataModel/order');
//const CryptoJS=require("crypto-js")
const jwt=require('jsonwebtoken');
const { response } = require('express');


function addOrder(req, res, next) {
    console.log("inside order")
const order=new Order({});
    let pd=req.body.product;
    let cl=req.body.client;
    let odBy=req.body.orderBy;
    let prod=[];
    if(req.body.orderBy)order.orderBy={
      userId:odBy.userId,
      name:odBy.name,
      email:odBy.email,
      pan:odBy.pan
    }
  
  
  if(req.body.qty) order.qty=req.body.qty;
  if(req.body.address)order.address=req.body.address;
  if(req.body.cPerson)order.cPerson=req.body.cPerson;
  if(req.body.cNumber)order.cNumber=req.body.cNumber;
  if(req.body.status)order.status=req.body.status;
  if(req.body.remarks)order.remarks=req.body.remarks;
  if(req.body.subTotal)order.subTotal=req.body.subTotal;
  if(req.body.paymentM)order.paymentM=req.body.paymentM;
  if(req.body.amount)order.amount=req.body.amount;
  
  pd.forEach(element => {
    let productInfo={
    pid:element.pid,
    bqp:element.bqp,
    cat:element.cat,
    count:element.count,
    cp:element.cp,
    mrp:element.mrp,
    sp:element.sp,
    uqp:element.uqp,
    name:element.name,
    productId:element.productId,
    images:element.images,
    Delivary:element.Delivary
    };
    prod.push(productInfo);
  
  });
order.product=prod;

  order.save()
.then((tr)=>{(res.send(tr+"order added sucessfully") )})
.catch((err)=>{(res.send(err))})


}
function getOrders(req,res,next){
    console.log("inside get orders");
    Order.find()
    .then((pr)=>{res.send(pr)})
    .catch((err)=>{(res.send(err))})
}
  
function getOrder(req,res,next){
    console.log("inside get products");  
    Order.find({_id:req.params.id})
    .then((pr)=>{(res.send(pr+"specific order list"))})
    .catch((err)=>{(res.send(err))})
}
  
function deleteOrder(req,res,next){
  console.log("inside delete user")
  
  Order.findByIdAndDelete(req.params.id)
   .then((ord)=>{res.send(ord+"deleted sucessfully")})
      .catch((err)=>{res.send(err)})
}  

function updateOrder(req,res,next){
  
    console.log("inside updation")
    Order.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true}
        ).then((ord)=>{
            (res.status(200).send(ord+"updated sucessfully"))
        })
        .catch((err)=>{
            const error="error while updating"
            next(error)
            (res.send(err))
        })
    
       

}

module.exports={addOrder,getOrders,deleteOrder,updateOrder,getOrder}  