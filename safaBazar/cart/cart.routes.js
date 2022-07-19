const express=require('express');
//const verify=require('../signUp/verifyToken/verifyToken')
const controllerCart=require('../cart/cart.controller');

const router=express.Router();


router.get('/', (req,res,next)=>{
console.log("working")
}
)
router.get('/getcart/:id',(controllerCart.getcart));

router.get('/getcarts',(controllerCart.getcart));
router.post('/addcart',(controllerCart.addCart));
router.delete('/deletecart/:id',(controllerCart.deleteCart));
router.post('/updatecart/:id',(controllerCart.updateCart));

module.exports=router;