const { MONGO_CONNECTION_STRING } = require('../common/config');
const mongoose = require('mongoose');
const usersMemoryRepository = require('../resources/users/user.memory.repository');

async function setAdminUser() {
  const user = {
    name: 'Admin',
    login: 'admin',
    password: 'admin'
  };

  const userExisted = await usersMemoryRepository.getByLogin(user.login);

  if (!userExisted) {
    await usersMemoryRepository.createUser(user);
  }
}

const connectDb = fn => {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);

  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log('DB Connected!');
    await setAdminUser();
    fn();
  });
};

module.exports = connectDb;
