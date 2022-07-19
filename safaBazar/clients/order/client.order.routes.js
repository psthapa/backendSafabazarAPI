const express=require('express');
//const verify=require('../signUp/verifyToken/verifyToken')
const controllerOrder=require('../../clients/order/client.order.controller'); 

const router=express.Router();


router.get('/', (req,res,next)=>{
console.log("working")
}
)
router.get('/getorders',(controllerOrder.getOrders));

router.get('/getorder/:id',(controllerOrder.getOrder));
router.post('/addorder',(controllerOrder.addOrder));
router.post('/deleteOrder/:id',(controllerOrder.deleteOrder));
router.post('/updateorder/:id',(controllerOrder.updateOrder));

module.exports=router;