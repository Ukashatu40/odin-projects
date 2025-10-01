const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.POSTGRES_URI_DEV });

exports.getNewPlayerForm = async (req, res, errors = []) => {
  try {
    const categoriesResult = await pool.query('SELECT * FROM categories ORDER BY name');
    res.render('players/new', {
      errors,
      categories: categoriesResult.rows,
      player: req.body,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createPlayer = async (req, res) => {
  const { name, category_id, position, club, nationality, age } = req.body;
  try {
    await pool.query(
      'INSERT INTO players (name, category_id, position, club, nationality, age) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, category_id, position, club, nationality, age]
    );
    res.redirect('/categories');
  } catch (err) {
    console.error(err);
    exports.getNewPlayerForm(req, res, [{ msg: 'Failed to create player' }]);
  }
};

exports.getPlayer = async (req, res) => {
  try {
    const playerResult = await pool.query('SELECT p.*, c.name AS category_name FROM players p JOIN categories c ON p.category_id = c.id WHERE p.id = $1', [req.params.id]);
    if (playerResult.rows.length === 0) {
      return res.status(404).send('Player not found');
    }
    res.render('players/show', { player: playerResult.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getEditPlayerForm = async (req, res, errors = []) => {
  try {
    const playerResult = await pool.query('SELECT * FROM players WHERE id = $1', [req.params.id]);
    const categoriesResult = await pool.query('SELECT * FROM categories ORDER BY name');
    if (playerResult.rows.length === 0) {
      return res.status(404).send('Player not found');
    }
    res.render('players/edit', {
      player: playerResult.rows[0],
      categories: categoriesResult.rows,
      errors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updatePlayer = async (req, res) => {
  const { name, category_id, position, club, nationality, age } = req.body;
  try {
    await pool.query(
      'UPDATE players SET name = $1, category_id = $2, position = $3, club = $4, nationality = $5, age = $6 WHERE id = $7',
      [name, category_id, position, club, nationality, age, req.params.id]
    );
    res.redirect(`/players/${req.params.id}`);
  } catch (err) {
    console.error(err);
    exports.getEditPlayerForm(req, res, [{ msg: 'Failed to update player' }]);
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    await pool.query('DELETE FROM players WHERE id = $1', [req.params.id]);
    res.redirect('/categories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};