const bcrypt = require('bcryptjs');
const router = require('express').Router();

const { verifyToken, verifyTokenAndAuthorization } = require('../middleware/verifyToken');
const { update, remove } = require('../controller/user');

router.put('/:id', verifyTokenAndAuthorization, update);

router.delete('/:id', verifyTokenAndAuthorization, remove);

module.exports = router;