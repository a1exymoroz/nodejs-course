const User = require('./user.model');

const getAll = async () => {
  return await User.find();
};

const getById = async id => {
  return await User.findById(id);
};

const createUser = async user => {
  const newUser = new User({ ...user });
  return await newUser.save();
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
  createUser,
  updateUser,
  deleteUser
};
