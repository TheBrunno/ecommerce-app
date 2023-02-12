const router = require('express').Router();

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');
const { create, update, remove, show, index } = require('../controller/product');

router.post('/', verifyTokenAndAdmin, create);
router.put('/:id', verifyTokenAndAdmin, update);
router.delete('/:id', verifyTokenAndAdmin, remove);
router.get('/find/:id', show);
router.get('/', index);

module.exports = router;