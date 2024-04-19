const { deleteImgCloudinary } = require('../../utils/dlt');
const Game = require('../models/Game');

//Get para poder ver todos los juegos
const getGames = async (req, res, next) => {
  try {
    const games = await Game.find();
    return res.status(200).json(games);
  } catch (error) {
    return res.status(500).json('Error, no Games');
  }
};

//Get para poder ver un juego por medio del ID
const getGameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);
    if (game) {
      return res.status(200).json(game);
    } else {
      return res.status(404).json('No Game found by this id');
    }
  } catch (error) {
    return next(error);
  }
};

//Get para poder ver los juegos por medio de la categoria
const getGameByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const game = await Game.find({ category: category });
    if (game) {
      return res.status(200).json(game);
    } else {
      return res.status(404).json('No Game found by this category');
    }
  } catch (error) {
    return next(error);
  }
};

//Post para crear un nuevo juego
const postGame = async (req, res, next) => {
  try {
    const newGame = new Game({
      name: req.body.name,
      image: req.file ? req.file.path : 'not image',
      category: req.body.category
    });
    const gameCreated = await newGame.save();
    return res.status(201).json(gameCreated);
  } catch (error) {
    return next(error);
  }
};

//Put para actualizar el juego por medio del ID
const putGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gameActual = await Game.findById(id);
    const gameUpdated = await Game.findByIdAndUpdate(id, {
      name: req.body.name,
      image: req.file ? req.file.path : 'not image',
      category: req.body.category
    });
    if (gameActual.image) deleteImgCloudinary(gameActual.image);
    return res.status(200).json(gameUpdated);
  } catch (error) {
    return next(error);
  }
};

//Delete para eliminar el juego por medio del ID
const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gameDeleted = await Game.findByIdAndDelete(id);
    if (gameDeleted.image) deleteImgCloudinary(gameDeleted.image);
    return res.status(200).json(gameDeleted);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getGames,
  getGameById,
  getGameByCategory,
  postGame,
  putGame,
  deleteGame
};
