const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  displayName: {
    name: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Board', BoardSchema)

// API
// GET: list board theo createdBy
// /api/boards
// UI: home (đã đăng nhập rồi) các bảng của mình

// POST: tạo board
// Input: displayName
// 

// GET: get detail board
// /api/boards/:id
// Full dữ liệu
// board = await Board.find(boarđID)
// cols = await Col.find(boardID).sort({ order: 1 })
// cards = await Card.find(boardId)sort({ order: 1 })


// UPDATE: Cứ gửi Full dữ liệu bảng
// Xoá hết dữ liệu cũ
// deleteMany: 
// ColModel => deleteMany (boardId)
// CardModel=> deleteMany (boardId)

// insertMany
// cols => cols.map(col, idx => ({ title, boardId, order}))
// cards => cars.map(col, idx => )
// Dựa mock data => update ngược lại

// boars/:id
// hiển thị giao diện của Vinh
// Anh Vinh ghép API vào
// 

// cards = [{ col: 1, board: 1}, { col: 2', board: 1}]

// groupCards = groupBy(cards. 'col')
// { 1: [ {col: 1, board: 1}], 2: }
// {
//   _id: 'abc',
//   columnOrder: [''],
//   columns: [
//     {
//       _id,
//       boardId,
//       title,
//       cardOrder: [],
//       cards: groupCards(colId)
//     }
//   ]
// }


