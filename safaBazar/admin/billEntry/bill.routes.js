const express=require('express');
//const verify=require('../signUp/verifyToken/verifyToken')
const controllerBill=require('../../admin/billEntry/admin.billentry.controller'); 

const router=express.Router();


router.get('/', (req,res,next)=>{
console.log("working")
}
)

router.get('/getbills',(controllerBill.getbills));
router.get('/getbill/:id',(controllerBill.getbill));
router.post('/addbill',(controllerBill.billEntry));
router.delete('/deletebill/:id',(controllerBill.deleteBill));
router.put('/updatebill/:id',(controllerBill.updateBill));

module.exports=router;