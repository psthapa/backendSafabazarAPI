const Test=require('../../safaBazar/safaBazarDataModel/testmodel');
const CryptoJS=require("crypto-js")
const jwt=require('jsonwebtoken');
const { response } = require('express');

function addTest(req, res, next) {
    console.log("inside add")
const test=new Test({

    panNumber:req.body.panNumber,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    })
test.save()
.then((tr)=>{(res.send(tr))})
.catch((err)=>{(res.send(err))})


}
function getTest(req,res,next){
    console.log("inside get");
    Test.find()
    .then((test)=>{(res.send(test+"get req"))})
    .catch((err)=>{(res.send(err))})
}
function deleteTest(req,res,next){
    console.log("inside delete user")
    
    Test.findByIdAndDelete(req.params.id)
     .then((product)=>{res.send(product+"deleted sucessfully")})
        .catch((err)=>{res.send(err)})
}

module.exports={addTest,getTest,deleteTest}