const Cart=require('../cart/cart.model');
const CryptoJS=require("crypto-js")
const jwt=require('jsonwebtoken')

function getcarts(req,res,next){
    console.log("inside get users")
    
    Cart.find()
    .then((cart)=>{
        (res.send(cart))})
    .catch((err)=>{res.send(err)});
}
function getcart(req,res,next){
    console.log("inside get users")
    
    Cart.find({_id:req.body.id})
    .then((cart)=>{
        (res.send(cart))})
    .catch((err)=>{res.send(err)});
}

function addCart(req,res,next){
  const cart=new Cart({});
console.log(req.body);
cart.productname=req.body.productname;
cart.qty=req.body.qty;
cart.price=req.body.price;
cart.total=req.body.total;
cart.save()
.then((cart)=>{res.json(cart+"added sucessfully")})
.catch((err)=>next(err));
}
function deleteCart(req, res, next) {
    console.log("inside delete user")
  
    Cart.findByIdAndDelete(req.params.id)
      .then((cart) => { res.send(cart + "deleted sucessfully") })
      .catch((err) => { res.send(err) })
  }
  function updateCart(req, res, next) {

    console.log("inside updation")
    Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }
    ).then((cart) => {
      (res.status(200).send(cart + "updated sucessfully"))
    })
      .catch((err) => {
        const error = "error while updating"
        next(error)
          (res.send(err))
      })
  }
  
module.exports={getcart,getcarts,addCart,deleteCart,updateCart}