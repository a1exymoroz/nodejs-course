const { BCRYPT_ROUNDS } = require('../../common/config');
const bcrypt = require('bcrypt');
const User = require('./user.model');

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
  await bcrypt.hash(
    user.password,
    parseInt(BCRYPT_ROUNDS, 10),
    async (err, hash) => {
      if (err) {
        throw new Error('Something went wrong');
      }
      user.password = hash;
      const userCreated = new User({ ...user });

      return await userCreated.save();
    }
  );
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
