const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if(err) return res.status(401).json({
        errors: ['token isn\'t valid']
      })
      req.user = user;
      next();
    });
  }else{
    return res.status(401).json({
      errors: ['you aren\'t authenticated']
    })
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin){
      next();
    }else{
      res.status(403).json({
        errors: ['you aren\'t allowed to do this action']
      })
    }
  })
}

module.exports = { verifyToken, verifyTokenAndAuthorization };