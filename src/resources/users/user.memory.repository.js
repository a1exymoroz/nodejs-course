const User = require('./user.model');

let users = [];

const getAll = async () => {
  return users;
};

const getById = async id => {
  return users.find(user => user.id === id);
};

const createUser = async user => {
  const newUser = new User({ ...user });
  users.push(newUser);

  return newUser;
};

const updateUser = async userUpdated => {
  const currentUser = users.find(user => user.id === userUpdated.id);

  currentUser.name = userUpdated.name;
  currentUser.login = userUpdated.login;
  currentUser.password = userUpdated.password;

  return currentUser;
};

const deleteUser = async id => {
  users = users.filter(user => user.id !== id);
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser
};
