const express = require('express');
const controllerLogIn = require('../../controllers/admin.controller/admin.controller')
    //const verify=require('../signUp/verifyToken/verifyToken')
const controllerProducts = require('../../controllers/admin.controller/admin.Product.controller');

const controllerVendor = require('../../controllers/admin.controller/admin.vendor.controller');

const router = express.Router();


router.get('/', (req, res, next) => {
    console.log("working")
})

router.get('/getusers', (controllerLogIn.getadmin));
router.post('/login', (controllerLogIn.login));
router.get('/getproducts', (controllerProducts.getproducts));
router.get('/getproducts/:id', (controllerProducts.getproduct));
router.post('/addproducts', (controllerProducts.addProduct));
router.post('/deleteproducts/:id', (controllerProducts.deleteProduct));
router.post('/updateproducts/:id', (controllerProducts.updateProduct));
router.post('/addvendor', (controllerVendor.addVendor));
router.get('/getvendor', (controllerVendor.getVendros));
router.get('/deletevendor/:id', (controllerVendor.deleteVendor));;
router.get('/updatevendor/:id', (controllerVendor.updateVendor));;

module.exports = router;