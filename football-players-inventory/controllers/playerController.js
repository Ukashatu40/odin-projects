const { deletePlayerById, getAllCategories, insertPlayers, getPlayerByIdWithHisCategory, updatePlayerWithProperties, getPlayerById } = require('../db/queries');

exports.getNewPlayerForm = async (req, res, errors = []) => {
  try {
    const categoriesResult = await getAllCategories();
    res.render('players/new', {
      errors: [],
      categories: categoriesResult,
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
    await insertPlayers(name, category_id, position, club, nationality, age);
    res.redirect('/categories');
  } catch (err) {
    console.error(err);
    exports.getNewPlayerForm(req, res, [{ msg: 'Failed to create player' }]);
  }
};

exports.getPlayer = async (req, res) => {
  try {
    const playerResult = await getPlayerByIdWithHisCategory(req.params.id);
    if (playerResult.length === 0) {
      return res.status(404).send('Player not found');
    }
    res.render('players/show', { player: playerResult });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getEditPlayerForm = async (req, res, errors = []) => {
  try {
    const playerResult = await getPlayerById(req.params.id);
    const categoriesResult = await getAllCategories();
    if (playerResult.length === 0) {
      return res.status(404).send('Player not found');
    }
    res.render('players/edit', {
      player: playerResult,
      categories: categoriesResult,
      errors: [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updatePlayer = async (req, res) => {
  const { name, category_id, position, club, nationality, age } = req.body;
  try {
    await updatePlayerWithProperties(name, category_id, position, club, nationality, age, req.params.id);
    res.redirect(`/players/${req.params.id}`);
  } catch (err) {
    console.error(err);
    exports.getEditPlayerForm(req, res, [{ msg: 'Failed to update player' }]);
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    await deletePlayerById(req.params.id);
    res.redirect('/categories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};