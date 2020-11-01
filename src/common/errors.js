class UserNotFoundError extends Error {
  constructor() {
    super();

    this.code = 403;
    this.message = 'User was not found';
  }
}

class UserNotAuthorizedError extends Error {
  constructor() {
    super();

    this.code = 401;
    this.message = 'User is not authorized';
  }
}

module.exports = {
  UserNotFoundError,
  UserNotAuthorizedError
};
