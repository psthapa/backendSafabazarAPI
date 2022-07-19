const express = require('express');

const controllerVendor = require('../../admin/vendor/vendor.controller');
// const imageUploader = require('../../imageUploadHelper/controller.imageuploader');
const router = express.Router();


router.get('/', (req, res, next) => {
    console.log("working")
})

router.post('/addvendor', (controllerVendor.addVendor));
router.get('/getvendor', (controllerVendor.getVendros));
router.get('/getvendor/:id', (controllerVendor.getvendor))
router.patch('/deletevendor/:id', (controllerVendor.deleteVendor));;
router.put('/updatevendor/:id', (controllerVendor.updateVendor));;

module.exports = router;