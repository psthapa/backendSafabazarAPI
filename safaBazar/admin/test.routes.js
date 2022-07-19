const express=require('express');
//const verify=require('../signUp/verifyToken/verifyToken')
const controllerTest=require('../../safaBazar/admin/testcontroller'); 

const router=express.Router();


router.get('/', (controllerTest.getTest))

router.post('/create',(controllerTest.addTest));
router.delete('/test/:id',(controllerTest.deleteTest));


module.exports=router;