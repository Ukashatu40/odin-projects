const { body } = require('express-validator');

const validateCategory = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ];

const validateUpdatedCategory = [
        body('name').notEmpty().withMessage('Name is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('adminPassword').notEmpty().withMessage('Admin password is required'),
    ]

const validateDeleteCategory = [body('adminPassword').notEmpty().withMessage('Admin password is required')]


  module.exports = { validateCategory, validateUpdatedCategory, validateDeleteCategory };