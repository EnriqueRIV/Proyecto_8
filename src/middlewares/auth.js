const User = require('../api/models/User');
const { verifyJwt } = require('../utils/jwt');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json('Wrong, Authorization invalid.');
    }

    const tokenParsed = token.replace('Bearer ', '');
    const { id } = verifyJwt(tokenParsed);
    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { isAuth };
