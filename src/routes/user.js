const bcrypt = require('bcryptjs');
const router = require('express').Router();

const { verifyToken, verifyTokenAndAuthorization } = require('../middleware/verifyToken');
const { update } = require('../controller/user');

router.put('/:id', verifyTokenAndAuthorization, update)

router.delete('/:id')

module.exports = router;