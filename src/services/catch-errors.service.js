const catchErrors = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    next(e);
    return;
  }
};

module.exports = catchErrors;
