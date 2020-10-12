const { Board } = require('./board.model');

let boards = [];

const getAll = async () => {
  return boards;
};

const getById = async id => {
  return boards.find(board => board.id === id);
};

const createBoard = async board => {
  const newBoard = new Board({ ...board });
  boards.push(newBoard);

  return newBoard;
};

const updateBoard = async boardUpdated => {
  const currentBoard = boards.find(board => board.id === boardUpdated.id);

  currentBoard.title = boardUpdated.title;
  currentBoard.columns = boardUpdated.columns;

  return currentBoard;
};

const deleteBoard = async boardId => {
  boards = boards.filter(board => board.id !== boardId);
};

module.exports = {
  getAll,
  getById,
  createBoard,
  updateBoard,
  deleteBoard
};
