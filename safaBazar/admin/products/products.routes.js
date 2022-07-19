const express = require('express');
//const verify=require('../signUp/verifyToken/verifyToken')
const controllerProducts = require('../../admin/products/products.controller');

const router = express.Router();


router.get('/', (req, res, next) => {
    console.log("working")
})
router.get('/getproducts/:id', (controllerProducts.getproduct));

router.get('/getproducts', (controllerProducts.getproducts));
router.post('/addproducts', (controllerProducts.addProduct));
router.patch('/deleteproducts/:id', (controllerProducts.deleteProduct));
router.patch('/updateproducts/:id', (controllerProducts.updateproduct));

module.exports = router;