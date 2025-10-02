const express = require('express');
const router = express.Router();

// GET admin password verification form
router.get('/verify', (req, res) => {
  const redirect = req.query.redirect || '/categories';
  if (!req.query.redirect) {
    console.warn('GET /admin/verify - No redirect query parameter provided, defaulting to:', redirect);
  } else {
    console.log('GET /admin/verify - Query:', req.query, 'Redirect URL:', redirect);
  }
  res.render('auth/admin', { errors: [], redirect });
});

// POST admin password verification
router.post('/verify', (req, res) => {
  const { adminPassword, redirect } = req.body;
  console.log('POST /admin/verify - Body:', req.body, 'Admin Password:', adminPassword, 'Redirect URL:', redirect);
  if (!redirect) {
    console.error('No redirect URL provided in form submission');
    return res.status(400).send('Bad Request: No redirect URL provided');
  }
  if (adminPassword === process.env.ADMIN_PASSWORD) {
    console.log('Password verified, redirecting to:', `${redirect}&adminPassword=${encodeURIComponent(adminPassword)}`);
    return res.redirect(`${redirect}&adminPassword=${encodeURIComponent(adminPassword)}`);
  } else {
    console.log('Invalid password, re-rendering form with redirect:', redirect);
    res.render('auth/admin', { errors: [{ msg: 'Invalid admin password' }], redirect });
  }
});

module.exports = router;