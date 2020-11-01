const usersMemoryRepository = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = async () => await usersMemoryRepository.getAll();

const getById = async id => await usersMemoryRepository.getById(id);

const createUser = async user => await usersMemoryRepository.createUser(user);

const updateUser = async user => await usersMemoryRepository.updateUser(user);

const deleteUser = async id => {
  const result = await usersMemoryRepository.deleteUser(id);
  const userTasks = await taskService.getByUserId(id);
  const tasks = [];

  userTasks.map(task => {
    task.userId = null;
    tasks.push(taskService.updateTask(task.boardId, task.id, task));
  });

  await Promise.all(tasks);

  return result;
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser
};
