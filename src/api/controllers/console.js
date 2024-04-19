const { deleteImgCloudinary } = require('../../utils/dlt');
const Console = require('../models/Console');

//Get para poder ver todas las Consolas existentes
const getConsoles = async (req, res, next) => {
  try {
    const consoles = await Console.find().populate('games');
    return res.status(200).json(consoles);
  } catch (error) {
    return res.status(400).json('Error, no Consoles');
  }
};

//Get para poder ver la Consola mediante el ID que posee
const getConsoleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const console = await Console.findById(id).populate('games');
    if (console) {
      return res.status(200).json(console);
    } else {
      return res.status(404).json('No Console found by this id');
    }
  } catch (error) {
    return next(error);
  }
};

//Post para crear una nueva Consola
const postConsole = async (req, res, next) => {
  try {
    const newConsole = new Console({
      name: req.body.name,
      image: req.file ? req.file.path : 'not image',
      games: []
    });
    const consoleCreated = await newConsole.save();
    return res.status(200).json(consoleCreated);
  } catch (error) {
    return next(error);
  }
};

//Put para adicionar un Juego a la Consola tomando como parametros los IDs de ambos
const putConsoleAddGame = async (req, res, next) => {
  try {
    const { consoleId } = req.body;
    const { gameId } = req.body;
    const updatedConsoleGame = await Console.findByIdAndUpdate(consoleId, {
      $push: { games: gameId }
    });
    return res.status(200).json(updatedConsoleGame);
  } catch (error) {
    return next(error);
  }
};

//Put para actualizar los juegos de la Consola tomando el ID de la consola
const putConsole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const consoleActual = await Console.findById(id);
    const consoleModify = new Console(req.body);
    consoleModify._id = req.params.id;
    consoleModify.image = req.file ? req.file.path : 'not image';
    consoleModify.games = [...consoleActual.games, ...[req.body.games]];

    const consoleUpdated = await Console.findByIdAndUpdate(id, consoleModify);
    if (consoleActual.image) deleteImgCloudinary(consoleActual.image);
    return res.status(200).json(consoleUpdated);
  } catch (error) {
    return next(error);
  }
};

//Delete para eliminar la Consola mediante el ID
const deleteConsole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const consoleDeleted = await Console.findByIdAndDelete(id);
    if (consoleDeleted.image) deleteImgCloudinary(consoleDeleted.image);
    return res.status(200).json(consoleDeleted);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getConsoles,
  getConsoleById,
  postConsole,
  putConsole,
  deleteConsole,
  putConsoleAddGame
};
