const Board = require('./board.model');

const getAll = async () => {
  return await Board.find();
};

const getById = async id => {
  return await Board.findById(id);
};

const createBoard = async board => {
  const boardCreated = new Board({ ...board });

  return await boardCreated.save();
};

const updateBoard = async boardUpdated => {
  return await Board.updateOne({ _id: boardUpdated.id }, boardUpdated);
};

const deleteBoard = async boardId => {
  return await Board.deleteOne({ _id: boardId });
};

module.exports = {
  getAll,
  getById,
  createBoard,
  updateBoard,
  deleteBoard
};
