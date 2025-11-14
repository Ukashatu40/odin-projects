const {body} = require('express-validator');

const validateRegistration = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .isLength({min: 2}).withMessage('Name must be at least 2 characters long'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
];

const validateLogin = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required'),
];

const validatePostCreation = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({min: 5}).withMessage('Title must be at least 5 characters long'),
    body('content')
        .notEmpty().withMessage('Content is required')
        .isLength({min: 20}).withMessage('Content must be at least 20 characters long'),
];

const validateComment = [
    body('content')
        .notEmpty().withMessage('Content is required')
        .isLength({min: 1}).withMessage('Content must be at least 1 character long'),
];

module.exports = {validateRegistration, validatePostCreation, validateComment, validateLogin};