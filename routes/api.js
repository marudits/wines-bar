var express = require('express');
var router = express.Router();

// models
const wines = require('../models/wines');

// API: wines
router.get('/wines', wines.getWines);
router.get('/wines/:id', wines.getWineDetails);
router.post('/wines', wines.orderWines);

// default router
router.get('*', (req, res, next) => {
    const URL = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.status(404).json(new Envelope(false, { message: CONSTANTS.RESPONSE.CODE['404'], url: URL }));
});

module.exports = router;
