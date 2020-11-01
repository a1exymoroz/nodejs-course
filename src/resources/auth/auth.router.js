const router = require('express').Router();
const catchErrors = require('../../services/catch-errors.service');
const authService = require('./auth.service');

router.route('/').post(
  catchErrors(async (req, res) => {
    const authData = req.body;
    const token = await authService.login(authData);

    res.status(200).json({ token });
  })
);

module.exports = router;
