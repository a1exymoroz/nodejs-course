const usersMemoryRepository = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersMemoryRepository.getAll();

const getById = id => usersMemoryRepository.getById(id);

const createUser = user => usersMemoryRepository.createUser(user);

const updateUser = user => usersMemoryRepository.updateUser(user);

const deleteUser = async id => {
  await usersMemoryRepository.deleteUser(id);
  const userTasks = await taskService.getByUserId(id);

  userTasks.forEach(async task => {
    task.userId = null;
    await taskService.updateTask(task.boardId, task.id, task);
  });
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser
};
