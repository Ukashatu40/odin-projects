const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const playerController = require('../controllers/playerController');

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
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('category_id').isInt().withMessage('Valid category is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('club').notEmpty().withMessage('Club is required'),
    body('nationality').notEmpty().withMessage('Nationality is required'),
    body('age').isInt({ min: 1 }).withMessage('Age must be a positive number'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return playerController.getNewPlayerForm(req, res, errors.array());
    }
    next();
  },
  playerController.createPlayer
);

// Get player details
router.get('/:id', playerController.getPlayer);

// Get form to edit a player
router.get('/:id/edit', playerController.getEditPlayerForm);

// Update a player
router.put(
  '/:id',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('category_id').isInt().withMessage('Valid category is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('club').notEmpty().withMessage('Club is required'),
    body('nationality').notEmpty().withMessage('Nationality is required'),
    body('age').isInt({ min: 1 }).withMessage('Age must be a positive number'),
    body('adminPassword').notEmpty().withMessage('Admin password is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return playerController.getEditPlayerForm(req, res, errors.array());
    }
    next();
  },
  verifyAdmin,
  playerController.updatePlayer
);

// Delete a player
router.delete(
  '/:id',
  [body('adminPassword').notEmpty().withMessage('Admin password is required')],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('auth/admin', { errors: errors.array(), redirect: req.originalUrl });
    }
    next();
  },
  verifyAdmin,
  playerController.deletePlayer
);

module.exports = router;