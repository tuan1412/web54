const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
  title: {
    name: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  boardId: {
    type: mongoose.Types.ObjectId,
    ref: 'Board'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Column', ColumnSchema)