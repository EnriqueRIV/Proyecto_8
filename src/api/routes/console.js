const express = require('express');
const { isAdmin } = require('../../middlewares/isadmin');
const {
  getConsoles,
  getConsoleById,
  postConsole,
  putConsole,
  deleteConsole,
  putConsoleAddGame
} = require('../controllers/console');
const { uploadFile } = require('../../middlewares/uploadfile');

//Rutas para Consolas, el documento Consola solo podra ser creado, actualizado, visto por ID y eliminado por el administrador, sí podran ser vistas todas las consolas por cualquier otra persona
const consolesRoutes = express.Router();

consolesRoutes.get('/', getConsoles);
consolesRoutes.get('/:id', [isAdmin], getConsoleById);
consolesRoutes.post(
  '/create',
  [isAdmin],
  uploadFile.single('image'),
  postConsole
);
consolesRoutes.put(
  '/edit/:id',
  [isAdmin],
  uploadFile.single('image'),
  putConsole
);
consolesRoutes.delete('/delete/:id', [isAdmin], deleteConsole);
consolesRoutes.put('/addGame/:id', [isAdmin], putConsoleAddGame);

module.exports = consolesRoutes;
