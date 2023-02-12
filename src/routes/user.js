const bcrypt = require('bcryptjs');
const router = require('express').Router();

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');
const { update, remove, show, index, stats } = require('../controller/user');

router.put('/:id', verifyTokenAndAuthorization, update);

router.delete('/:id', verifyTokenAndAuthorization, remove);

router.get('/find/:id', verifyTokenAndAdmin, show);
router.get('/', verifyTokenAndAdmin, index);
router.get('/stats', verifyTokenAndAdmin, stats);

module.exports = router;