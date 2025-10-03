const {validationResult} = require('express-validator');

const playerMiddlewarePost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return playerController.getNewPlayerForm(req, res, errors.array());
    }
    next();
  };

const playerMiddlewareUpdate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return playerController.getEditPlayerForm(req, res, errors.array());
    }
    next();
  }

const playerMiddlewareDelete = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('auth/admin', { errors: errors.array(), redirect: req.originalUrl });
    }
    next();
  }



module.exports = {playerMiddlewarePost, playerMiddlewareUpdate, playerMiddlewareDelete};