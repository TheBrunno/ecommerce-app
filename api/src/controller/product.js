const Product = require('../models/Product');

module.exports.create = async (req, res) => {
  const newProduct = new Product(req.body);

  try{
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  }catch(err){
    res.status(500).json(err);
  }
}

module.exports.update = async (req, res) => {
  try{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });

    return res.status(200).json(updatedProduct);
  }catch(err){
    return res.status(500).json(err);
  }

}

module.exports.remove = async (req, res) => {
  try{
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('product has been deleted...');
  }catch(err){
    res.status(500).json({
      errors: ['error']
    })
  }
}

module.exports.show = async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  }catch(err){
    res.status(500).json({
      errors: ['error']
    })
  }
}

module.exports.index = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try{
    let products;

    if(qNew){
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    }else if(qCategory){
      products = await Product.find({ 
        categories: {
          $in: [qCategory]
        } 
      })
    }else{
      products = await Product.find();
    }

    res.status(200).json(products);
  }catch(err){
    res.status(500).json({
      errors: ['error']
    })
  }
}
