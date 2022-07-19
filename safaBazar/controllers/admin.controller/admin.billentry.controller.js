const BillEntry=require('../../safaBazarDataModel/billEntryModel');
const CryptoJS=require("crypto-js")
const jwt=require('jsonwebtoken')


function billEntry(req, res, next) {
    console.log("inside admin"+req.body.product);
    let product=[];
    
    const billentry=new BillEntry({})
    billentry.name=req.body.name;
    billentry.cp=req.body.cp;
    billentry.sp=req.body.sp;
    billentry.mrp=req.body.mp;
    billentry.uqp=req.body.uqp;
    billentry.bqp=req.body.bqp;
    billentry.cat=req.body.cat;
  
    if(req.body.product){
let items=req.body.product;
console.log("before for each "+items);
  items.forEach(element => {
    let productInfo={
    productId:element.productId,
    productName:element.productName,
    qty:element.qty
    };
    product.push(productInfo);

  });
  }
    
billentry.save()
.then((tr)=>{(res.send(tr))})
.catch((err)=>{(res.send(err))})
}
function getbills(req,res,next){
    console.log("inside get products");
    BillEntry.find()
    .then((pr)=>{(console.log(pr),res.send(pr))})
    .catch((err)=>{(res.send(err))})
}
module.exports={billEntry,getbills}