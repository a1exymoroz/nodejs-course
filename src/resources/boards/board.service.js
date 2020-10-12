const boardsMemoryRepository = require('./board.memory.repository');
const tasksMemoryRepository = require('../tasks/task.memory.repository');

const getAll = () => boardsMemoryRepository.getAll();

const getById = id => boardsMemoryRepository.getById(id);

const createBoard = board => boardsMemoryRepository.createBoard(board);

const updateBoard = board => boardsMemoryRepository.updateBoard(board);

const deleteBoard = async boardId => {
  await boardsMemoryRepository.deleteBoard(boardId);

  const tasks = await tasksMemoryRepository.getAll(boardId);

  tasks.forEach(async task => {
    await tasksMemoryRepository.deleteTask(boardId, task.id);
  });
};

module.exports = {
  getAll,
  getById,
  createBoard,
  updateBoard,
  deleteBoard
};
