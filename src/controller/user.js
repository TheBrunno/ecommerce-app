const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.update = async (req, res) => {
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

}

module.exports.remove = async (req, res) => {
  try{

    await User.findByIdAndRemove(req.params.id);
    res.status(200).json('user has been deleted...')

  }catch(err){
    res.status(500).json({
      errors: ['error']
    })
  }
}