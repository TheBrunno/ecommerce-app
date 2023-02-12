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
    res.status(200).json('user has been deleted...');
  }catch(err){
    res.status(500).json({
      errors: ['error']
    })
  }
}

module.exports.show = async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  }catch(err){
    res.status(500).json({
      errors: ['error']
    })
  }
}

module.exports.index = async (req, res) => {
  const query = req.query.new;
  try{
    const users = query 
    ? await User.find().sort({ _id: -1 }).limit(5) 
    : await User.find();
    res.status(200).json(users);
  }catch(err){
    res.status(500).json({
      errors: ['error']
    })
  }
}

module.exports.stats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try{
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' }
        }
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 }
        }
      }
    ])
    res.status(200).json(data);
  }catch(err){
    res.status(500).json(err);
  }
}