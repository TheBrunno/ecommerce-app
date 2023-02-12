const router = require('express').Router();

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');
const { create, update, remove, show, index } = require('../controller/cart');

router.post('/', verifyToken, create);
router.put('/:id', verifyTokenAndAuthorization, update);
router.delete('/:id', verifyTokenAndAuthorization, remove);
router.get('/find/:userId', verifyTokenAndAuthorization, show);
router.get('/', verifyTokenAndAdmin, index);

module.exports = router;