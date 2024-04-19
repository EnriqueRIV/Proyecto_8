const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consoleSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, trim: true, required: true },
    games: [{ type: mongoose.Types.ObjectId, ref: 'Game', required: false }]
  },
  {
    timestamps: true,
    collection: 'consoles'
  }
);

const Console = mongoose.model('Console', consoleSchema, 'consoles');

module.exports = Console;
