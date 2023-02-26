const Order = require('../models/Order');

module.exports.create = async (req, res) => {
  const newOrder = new Order(req.body);

  try{
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  }catch(err){
    res.status(500).json(err);
  }
}

module.exports.update = async (req, res) => {
  try{
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });

    res.status(200).json(updatedOrder);
  }catch(err){
    res.status(500).json(err);
  }

}

module.exports.remove = async (req, res) => {
  try{
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('order has been deleted...');
  }catch(err){
    res.status(500).json({
      errors: ['error']
    })
  }
}

module.exports.show = async (req, res) => {
  try{
    const order = await Order.find({ userId: req.params.userId });
    res.status(200).json(order);
  }catch(err){
    res.status(500).json({
      errors: ['error']
    })
  }
}

module.exports.index = async (req, res) => {
  try{
    const order = await Order.find();
    res.status(200).json(order);
  }catch(err){
    res.status(500).json(err);
  }
}

module.exports.stats = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};