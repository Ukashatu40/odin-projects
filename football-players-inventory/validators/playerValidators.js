const {body} = require('express-validator');

const validatePlayer = [
    body('name').notEmpty().withMessage('Name is required'),
    body('category_id').isInt().withMessage('Valid category is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('club').notEmpty().withMessage('Club is required'),
    body('nationality').notEmpty().withMessage('Nationality is required'),
    body('age').isInt({ min: 1 }).withMessage('Age must be a positive number'),
  ];

const validatePlayerUpdate = [
    body('name').notEmpty().withMessage('Name is required'),
    body('category_id').isInt().withMessage('Valid category is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('club').notEmpty().withMessage('Club is required'),
    body('nationality').notEmpty().withMessage('Nationality is required'),
    body('age').isInt({ min: 1 }).withMessage('Age must be a positive number'),
    body('adminPassword').notEmpty().withMessage('Admin password is required'),
  ]

const validatePlayerDelete = [body('adminPassword').notEmpty().withMessage('Admin password is required')]


module.exports = { validatePlayer ,validatePlayerUpdate, validatePlayerDelete};