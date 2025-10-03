const express = require('express');
const router = express.Router();

// GET admin password verification form
router.get('/verify', (req, res) => {
  const redirect = req.query.redirect;;
  console.log('GET /admin/verify - Query:', req.query, 'Redirect URL:', redirect);
  res.render('auth/admin', { errors: [], redirect });
});

// POST admin password verification
router.post('/verify', (req, res) => {
  const { adminPassword, redirect } = req.body;
  const decodedRedirect = redirect ? decodeURIComponent(redirect) : '/categories';
  console.log('POST /admin/verify - Body:', req.body, 'Admin Password:', adminPassword, 'Redirect URL:', decodedRedirect);
  if (!decodedRedirect) {
    console.error('No redirect URL provided in form submission');
    return res.status(400).send('Bad Request: No redirect URL provided');
  }
  if (adminPassword === process.env.ADMIN_PASSWORD) {
    console.log('Password verified, redirecting to:', decodedRedirect);
    res.redirect(decodedRedirect);
  } else {
    console.log('Invalid password, re-rendering form');
    res.render('auth/admin', { errors: [{ msg: 'Invalid admin password' }], redirect: decodedRedirect });
  }
});

module.exports = router;