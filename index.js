require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const usersRoutes = require('./src/api/routes/user');
const consolesRoutes = require('./src/api/routes/console');
const gamesRoutes = require('./src/api/routes/game');
const { configCloudinary } = require('./src/config/cloudinary');

const PORT = 3001;
const server = express();

server.use(express.json());
// server.use(bodyParser.json());

connectDB();
configCloudinary();

server.use('/users', usersRoutes);
server.use('/consoles', consolesRoutes);
server.use('/games', gamesRoutes);

server.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
});

server.listen(PORT, () => {
  console.log(`Server connected in: http://localhost:${PORT}`);
});
