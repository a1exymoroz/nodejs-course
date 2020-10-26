const { MONGO_CONNECTION_STRING } = require('../common/config');
const mongoose = require('mongoose');

const connectDb = fn => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('DB Connected!');
    fn();
  });
};

module.exports = connectDb;
