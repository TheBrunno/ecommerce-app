const router = require('express').Router();
const { payment } = require('../controller/stripe');

router.post('/payment', payment);

module.exports = router;