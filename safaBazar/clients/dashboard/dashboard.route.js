const express = require('express');
const ctrl = require('./dashboard.controller');
const router = express.Router();

router.route('/:orgId')

    /** GET /api/order/:orgId - Get the list statistics for dashbaord */
    .get(ctrl.list);

router.route('/:orgId/latest-order')

    /** GET /api/order/:orgId/latest-order - Get the list order */
    .get(ctrl.latestOrder);



/** Load user when API with orgId route parameter is hit */
router.param('orgId', ctrl.load);


module.exports = router;