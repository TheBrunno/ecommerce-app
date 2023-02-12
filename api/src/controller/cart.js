const Cart = require('../models/Cart');

module.exports.create = async (req, res) => {
  const newCart = new Cart(req.body);

  try{
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  }catch(err){
    res.status(500).json(err);
  }
}

module.exports.update = async (req, res) => {
  try{
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });

    return res.status(200).json(updatedCart);
  }catch(err){
    return res.status(500).json(err);
  }

}

module.exports.remove = async (req, res) => {
  try{
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json('cart has been deleted...');
  }catch(err){
    res.status(500).json({
      errors: ['error']
    })
  }
}

module.exports.show = async (req, res) => {
  try{
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  }catch(err){
    res.status(500).json({
      errors: ['error']
    })
  }
}

module.exports.index = async (req, res) => {
  try{
    const cart = await Cart.find();
    res.status(200).json(cart);
  }catch(err){
    res.status(500).json(err);
  }
}
