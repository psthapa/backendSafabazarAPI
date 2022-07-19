const express = require('express');
const router = express.Router();
const clientOrder= require('../clients/order/client.order.routes');
const clientsign=require('../clients/auth/auth.route');


router.use('/order', clientOrder);
router.use('/auth',clientsign);

module.exports = router;