const express = require('express');
const router = express.Router();
const clientRoutes = require('./safaBazar/clients/client.routes');
const adminRoutes = require('./safaBazar/admin/admin.routes');
const cart = require('./safaBazar/cart/cart.routes');
//router.use('/vendor',vendorRoutes);

router.use('/client', clientRoutes);

router.use('/admin', adminRoutes);

router.use('/cart', cart);
module.exports = router;