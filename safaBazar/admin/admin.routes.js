const express = require('express');
const router = express.Router();
const adminVendor = require('../admin/vendor/vendor.routes');
const adminProduct = require('../admin/products/products.routes');
const test=require('../admin/test.routes');
const adminBill=require('../admin/billEntry/bill.routes');
const { route } = require('../admin/products/products.routes');

router.use('/vendor', adminVendor);

router.use('/products', adminProduct);

router.use('/bill',adminBill);

router.use('/test',test);

module.exports = router;