const Product = require('../../safaBazarDataModel/product');
const { response } = require('express');

function addProduct(req, res, next) {
  console.log("inside admin")

  let product = new Product({});
  //   let user = req.user;
  console.log(req)
  console.log("inside req check")
  
 product.productId=req.body.productId;
  product.name = req.body.name;
  product.cp = req.body.cp;
  product.sp = req.body.sp;
  product.mrp = req.body.mrp;
  product.uqp = req.body.uqp;
  product.bqp = req.body.bqp;
  product.productName=req.body.productName;
  product.qty=req.body.qty;
  //product.images=req.file.path;
  product.cat=req.body.cat;

  console.log("after check");
  //   product.createdBy = {
  //     userId: user._id,
  //     name: user.name,
  //     avatar: user.avatar,
  //     email: user.email,
  //   };

//   product.vendor = {
//     vendorId: vendor.vendorId,
//     name: vendor.name,
//     pan: vendor.pan,
//   };

//   console.log(product.vendor);

//   product.bill={
// billNo:bill.billNo,
// billId:bill.billId
//   }
  // console.log(product.bill);
  //console.log(req.body.vendor.vendorID);
  console.log(req.body)
  product
    .save()
    .then((product) => {
      res.json(product + "added sucessfully");
    })
    .catch((e) => next(e));
}

function getproducts(req, res, next) {
  console.log("inside get products");
  Product.find()
    .then((pr) => { (console.log(pr), res.send(pr)) })
    .catch((err) => { (res.send(err)) })
}

function getproduct(req, res, next) {
  console.log("inside get products");
  Product.find({ _id: req.params.id })
    .then((pr) => { (console.log(pr), res.send(pr)) })
    .catch((err) => { (res.send(err)) })
}

function deleteProduct(req, res, next) {
  console.log("inside delete user")

  Product.findByIdAndDelete(req.params.id)
    .then((product) => { res.send(product + "deleted sucessfully") })
    .catch((err) => { res.send(err) })
}
function updateproduct(req,res,next){
  console.log("inside updation")
  
  Product.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true}
      ).then((product)=>{
          (res.status(200).send(product+"updated sucessfully"))
      })
      .catch((err)=>{
         // const error="error while updating"
         // next(error)
          (res.send(err))
      })
    }

module.exports = { addProduct, getproducts, deleteProduct, updateproduct, getproduct }