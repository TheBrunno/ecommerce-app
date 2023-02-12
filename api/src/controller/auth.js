const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.register = async (req, res) => {

  const { username, email, password } = req.body;
  if(!username || !email || !password){
    return res.status(400).json({
      error: ['please, enter with valid values']
    })
  }

  const passwordHash = await bcrypt.hash(req.body.password, 8);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: passwordHash
  })

  try{
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }catch(err){
    res.status(500).json(err);
  }
}

module.exports.login = async (req, res) => {
  
  const { username, password } = req.body;

  try{
    const user = await User.findOne({ username });

    if(!user) {
      return res.status(401).json({
        errors: ['wrong credentials']
      })
    }

    if(!await bcrypt.compare(password, user.password)){
      return res.status(401).json({
        errors: ['wrong credentials']
      })
    }

    const accessToken = jwt.sign({
      id: user.id,
      isAdmin: user.isAdmin
    }, process.env.JWT_SEC, 
    { expiresIn: '7d' });

    const { password: loggedPassword, ...others } = user._doc;
    return res.status(200).json({ ...others, accessToken });
  }catch(_){
    return res.status(500).json({
      errors: ['something error happen']
    });
  } 
}