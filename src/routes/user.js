const bcrypt = require('bcryptjs');
const router = require('express').Router();

const { verifyToken, verifyTokenAndAuthorization } = require('../middleware/verifyToken');
const User = require('../models/User');

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try{
    if(req.body.password){
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });

    return res.status(200).json(updatedUser);
  }catch(err){
    return res.status(500).json(err);
  }

})

module.exports = router;