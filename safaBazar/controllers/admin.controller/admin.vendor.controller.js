const Vendor=require('../../safaBazarDataModel/vendorModel');
const CryptoJS=require("crypto-js")
const jwt=require('jsonwebtoken')


function addVendor(req, res, next) {
    console.log("inside admin")
const vendor=new Vendor({
    name:req.body.name,
    address:req.body.address,
    pan:req.body.pan,
    cPerson:req.body.cPerson,
    cNumber:req.body.cNumber,
    email:req.body.email,
    isActive:req.body.isActive
});
vendor.save()
.then((tr)=>{(console.log("sucessfully added"),res.send(tr))})
.catch((err)=>{(res.send(err))})
}
function getVendros(req,res,next){
    Vendor.find()
    .then((result)=>{res.send(result)})
    .catch((err)=>{res.send(err)})
}
function deleteVendor(req,res,next){
    console.log("inside delete user")
    
    Vendor.findByIdAndDelete(req.params.id)
     .then((vendor)=>{res.send(vendor+"deleted sucessfully")})
        .catch((err)=>{res.send(err)})
  }
  function updateVendor(req,res,next){
  
    console.log("inside updation")
    Vendor.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true}
        ).then((vendor)=>{
            (res.status(200).send(vendor+"updated sucessfully"))
        })
        .catch((err)=>{
            const error="error while updating"
            next(error)
            (res.send(err))
        })
    
    

}
module.exports={addVendor,getVendros,deleteVendor,updateVendor}