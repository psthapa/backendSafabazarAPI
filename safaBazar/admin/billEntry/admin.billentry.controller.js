const BillEntry=require('../../safaBazarDataModel/billEntryModel');
const CryptoJS=require("crypto-js")
const jwt=require('jsonwebtoken');
const { response } = require('express');


function billEntry(req, res, next) {
  console.log(req.body);
  let products=[];
  let vendor=req.body.pan;
  let items=req.body.product;
console.log(vendor);
console.log("after vendor details");
console.log("before product body");
console.log(req.body.product);
  const billentry=new BillEntry({})
  billentry.billno=req.body.billno;
  billentry.totalamt=req.body.totalamt;
  billentry.paidamt=req.body.paidamt;
   if(req.body.product){
    
console.log("before items");
console.log(items);
items.forEach(element => {
  let productInfo={
  productId:element.productId,
  name:element.name,
  qty:element.qty
  };
  products.push(productInfo);

});

console.log("after product array");
console.log(products);
   }

   billentry.product=products;
   billentry.pan={
  panId:vendor.panId,
  vendorId:vendor.vendorId
}
  console.log("before saving bills");
billentry.save()
.then((tr)=>{(
  res.status(200).send(tr+"bills added sucessfully"))})
.catch((err)=>{(res.send(err))})
}

function getbills(req,res,next){
    console.log("inside get products");
    BillEntry.find()
    .then((pr)=>{(console.log(pr),res.send(pr))})
    .catch((err)=>{(res.send(err))})
}
  
function getbill(req,res,next){
    console.log("inside get products");
    BillEntry.find(req.params.id)
    .then((pr)=>{(console.log(pr),res.send(pr))})
    .catch((err)=>{(res.send(err))})
}
  
function deleteBill(req,res,next){
  console.log("inside delete user")
  
  BillEntry.findByIdAndDelete(req.params.id)
   .then((product)=>{res.send(product+"deleted sucessfully")})
      .catch((err)=>{res.send(err)})
}  

function updateBill(req,res,next){
  
    console.log("inside updation")
    BillEntry.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true}
        ).then((bill)=>{
            (res.status(200).send(bill+"updated sucessfully"))
        })
        .catch((err)=>{
            const error="error while updating"
            next(error)
            (res.send(err))
        })
    
    

}

module.exports={billEntry,getbills,deleteBill,updateBill,getbill}