const express = require('express');

const methodOverride = require('method-override');
require('dotenv').config();

const homeRouter = require('./routes/homeRouter');

const app = express();
const port = process.env.PORT || 3000;

// const POSTGRES_URI = process.env.DEVELOPMENT === 'true' ? process.env.POSTGRES_URI_DEV : process.env.POSTGRES_URI_PROD;

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Routes
app.use('/', homeRouter);
app.use('/categories', require('./routes/categoriesRouter'));
app.use('/players', require('./routes/playersRouter'));
app.use('/admin', require('./routes/auth'));


// Test route
app.get('/test', (req, res) => {
  res.render('test');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

