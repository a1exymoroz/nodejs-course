const bcrypt = require('bcrypt');
const { BCRYPT_ROUNDS } = require('../common/config');

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(parseInt(BCRYPT_ROUNDS, 10));
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const checkHashedPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = {
  hashPassword,
  checkHashedPassword
};
