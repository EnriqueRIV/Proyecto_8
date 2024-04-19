const { deleteImgCloudinary } = require('../../utils/dlt');
const { generateSign } = require('../../utils/jwt');
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Post para registrarse como nuevo usuario, el rol por defecto es "user" de esta forma solo el administrador cambiarà el rol en la DDBB, de igual manera se veriifica que el email o username no existan y evitar duplicados
const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userEmail: req.body.userEmail,
      userName: req.body.userName,
      password: req.body.password,
      yearBirth: req.body.yearBirth,
      role: 'user',
      imageAvatar: req.file ? req.file.path : 'not image'
    });

    const userDuplicated = await User.findOne({
      $or: [{ userName: req.body.userName }, { userEmail: req.body.userEmail }]
    });

    if (userDuplicated) {
      return res
        .status(400)
        .json('This username o email already exists, choose another one');
    }

    const userSaved = await newUser.save();
    return res.status(201).json(userSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//Post para realizar el login de usuario sea por email o por username, verificando contraseñas encriptadas y genrenado el token correspondiente
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ userName: req.body.userName }, { userEmail: req.body.userEmail }]
    });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id);
        return res.status(200).json({ mensaje: 'you are login!', user, token });
      } else {
        return res.status(400).json('The username or password are wrong');
      }
    } else {
      return res.status(400).json('The username or password are wrong');
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

//Get para poder ver todos los usuarios
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//Delete para eliminar un usuario por medio del ID
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDeleted = await User.findByIdAndDelete(id);
    if (userDeleted.imageAvatar) deleteImgCloudinary(userDeleted.imageAvatar);
    return res
      .status(200)
      .json({ mensaje: 'This user was deleted', userDeleted });
  } catch (error) {
    return res.status(400).json(error);
  }
};

//Put pata actualizar un usuario por medio del ID
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userActual = await User.findById(id);
    const userModify = new User(req.body);
    userModify._id = id;
    userModify.userEmail = req.params.userEmail;
    userModify.imageAvatar = req.file ? req.file.path : 'not image';

    const userDuplicated = await User.findOne({ userName: req.body.userName });

    if (userDuplicated) {
      return res
        .status(400)
        .json('This username already exists, choose another one');
    }

    const userUpdated = await User.findByIdAndUpdate(id, userModify);
    userUpdated.save();
    if (userActual.imageAvatar) deleteImgCloudinary(userActual.imageAvatar);
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { register, login, getUsers, deleteUser, updateUser };
