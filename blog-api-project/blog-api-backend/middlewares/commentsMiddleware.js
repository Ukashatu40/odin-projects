const {validationResult} = require('express-validator');

const validateCommentMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateCommentMiddleware };
//File: blog-api-backend/controllers/postsController.js