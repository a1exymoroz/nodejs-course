const User = require('./user.model');
const { hashPassword } = require('../../services/hashService');

const getAll = async () => {
  return await User.find();
};

const getById = async id => {
  return await User.findById(id);
};

const getByLogin = async login => {
  return await User.findOne({ login });
};

const createUser = async user => {
  const { password } = user;
  const hashedPassword = await hashPassword(password);
  const newUser = {
    ...user,
    password: hashedPassword
  };
  const userCreated = new User({ ...newUser });
  return await userCreated.save();
};
const updateUser = async userUpdated => {
  return await User.updateOne({ _id: userUpdated.id }, userUpdated);
};

const deleteUser = async id => {
  return await User.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  getById,
  getByLogin,
  createUser,
  updateUser,
  deleteUser
};
