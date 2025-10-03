const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const playerController = require('../controllers/playerController');
const { validatePlayer, validatePlayerUpdate, validatePlayerDelete } = require('../validators/playerValidators');
const { playerMiddlewarePost, playerMiddlewareUpdate, playerMiddlewareDelete } = require('../middlewares/playerMiddleware');

// Middleware to check admin password
const verifyAdmin = (req, res, next) => {
  if (req.body.adminPassword === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.render('auth/admin', { errors: [{ msg: 'Invalid admin password' }], redirect: req.query.redirect || req.originalUrl });
  }
};

// Get form to create a new player
router.get('/new', playerController.getNewPlayerForm);

// Create a new player
router.post('/', validatePlayer, playerMiddlewarePost, playerController.createPlayer);

// Get player details
router.get('/:id', playerController.getPlayer);

// Get form to edit a player
router.get('/:id/edit', playerController.getEditPlayerForm);

// Update a player
router.put('/:id', validatePlayerUpdate, playerMiddlewareUpdate, verifyAdmin, playerController.updatePlayer);

// Delete a player
router.delete('/:id', validatePlayerDelete, playerMiddlewareDelete, verifyAdmin, playerController.deletePlayer);

module.exports = router;