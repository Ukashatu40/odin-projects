const {getAllCategories} = require('../db/queries');

async function  renderHomePage (req, res) {
    try {
        const result = await getAllCategories();
        console.log('Categories:', result);
        res.render('categories/index', { categories: result });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
}

module.exports = { renderHomePage };