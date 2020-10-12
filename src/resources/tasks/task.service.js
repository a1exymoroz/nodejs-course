const tasksMemoryRepository = require('./task.memory.repository');

const getAll = boardId => tasksMemoryRepository.getAll(boardId);

const getById = (boardId, taskId) =>
  tasksMemoryRepository.getById(boardId, taskId);

const getByUserId = userId => tasksMemoryRepository.getByUserId(userId);

const createTask = (boardId, task) => {
  task.boardId = boardId;
  return tasksMemoryRepository.createTask(task);
};

const updateTask = (boardId, taskId, task) =>
  tasksMemoryRepository.updateTask(boardId, taskId, task);

const deleteTask = (boardId, taskId) =>
  tasksMemoryRepository.deleteTask(boardId, taskId);

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteTask,
  getByUserId
};
