const router = require('express').Router();

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');
const { create, update, remove, show, index, stats } = require('../controller/order');

router.post('/', verifyToken, create);
router.put('/:id', verifyTokenAndAdmin, update);
router.delete('/:id', verifyTokenAndAdmin, remove);
router.get('/find/:userId', verifyTokenAndAuthorization, show);
router.get('/', verifyTokenAndAdmin, index);
router.get('/income', verifyTokenAndAdmin, stats);


module.exports = router;