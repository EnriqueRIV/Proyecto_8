const express = require('express');
const {
  getGames,
  getGameById,
  getGameByCategory,
  postGame,
  putGame,
  deleteGame
} = require('../controllers/game');
const { isAuth } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/isadmin');
const { uploadFile } = require('../../middlewares/uploadfile');

//Rutas para juegos, todos pueden ver todos los juegos y también por categorias, solo los usuarios logueados pueden ver juego por ID, crear el juego y actualizar el juego, el administrador es el unico autorizado a eliminar juegos
const gamesRoutes = express.Router();

gamesRoutes.get('/', getGames);
gamesRoutes.get('/:id', [isAuth], getGameById);
gamesRoutes.get('/category/:category', getGameByCategory);
gamesRoutes.post('/create', [isAuth], uploadFile.single('image'), postGame);
gamesRoutes.put('/edit/:id', [isAuth], uploadFile.single('image'), putGame);
gamesRoutes.delete('/delete/:id', [isAdmin], deleteGame);

module.exports = gamesRoutes;
