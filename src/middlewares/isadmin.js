const User = require('../api/models/User');
const { verifyJwt } = require('../utils/jwt');

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json('Wrong, Authorization invalid.');
    }

    const tokenParsed = token.replace('Bearer ', '');
    const { id } = verifyJwt(tokenParsed);
    const user = await User.findById(id);

    if (user.role === 'admin') {
      user.password = null;
      req.user = user;
      next();
    } else {
      return res.status(400).json('Just the Administrator can do this.');
    }
  } catch (error) {
    return res.status(400).json('Wrong, Authorization invalide');
  }
};

module.exports = { isAdmin };
