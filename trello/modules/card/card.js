const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  title: {
    name: String,
    required: true,
  },
  boardId: {
    type: mongoose.Types.ObjectId,
    ref: 'Board'
  },
  columnId: {
    type: mongoose.Types.ObjectId,
    ref: 'Column'
  },
  order: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Card', CardSchema)