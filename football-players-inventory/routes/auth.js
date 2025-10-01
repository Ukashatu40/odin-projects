const express = require('express');
const router = express.Router();

// GET admin password verification form
router.get('/verify', (req, res) => {
  res.render('auth/admin', { errors: [], redirect: req.query.redirect || '/categories' });
});

// POST admin password verification
router.post('/verify', (req, res) => {
  const { adminPassword, redirect } = req.body;
  if (adminPassword === process.env.ADMIN_PASSWORD) {
    // Redirect to the intended action (e.g., delete or update)
    res.redirect(redirect);
  } else {
    res.render('auth/admin', { errors: [{ msg: 'Invalid admin password' }], redirect });
  }
});

module.exports = router;