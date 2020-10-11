const usersMemoryRepository = require('./user.memory.repository');

const getAll = () => usersMemoryRepository.getAll();

const getById = id => usersMemoryRepository.getById(id);

const createUser = user => usersMemoryRepository.createUser(user);

const updateUser = user => usersMemoryRepository.updateUser(user);

const deleteUser = async id => {
  await usersRepo.deleteUser(id);
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser
};
