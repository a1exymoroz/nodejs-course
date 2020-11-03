const { JWT_SECRET_KEY } = require('../../common/config');
const jwt = require('jsonwebtoken');
const usersMemoryRepository = require('../users/user.memory.repository');
const { UserNotFoundError } = require('../../common/errors');
const { checkHashedPassword } = require('../../services/hashService');

const signToken = async authData => {
  const user = await usersMemoryRepository.getByLogin(authData.login);

  if (user) {
    const hashedPassword = user.password;

    const comparisonRes = await checkHashedPassword(
      authData.password,
      hashedPassword
    );

    if (comparisonRes) {
      const id = user.id;
      const login = user.login;
      const token = jwt.sign({ id, login }, JWT_SECRET_KEY, {
        expiresIn: '10m'
      });
      return token;
    }

    throw new UserNotFoundError();
  }
};

module.exports = {
  signToken
};
