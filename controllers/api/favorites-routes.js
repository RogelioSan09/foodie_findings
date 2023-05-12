const favoriteRouter = require('express').Router();
const {
  UserFavorite,
} = require('../../models');

// GET /favorites/:user_id
favoriteRouter.get('/:user_id', async (req, res) => {
  try {
    const favoriteData = await UserFavorite.findAll({
      include: [{ model: UserFavorite }],
      where: {
        user_id: req.params.user_id,
      },
    });
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// GET /favorites/:user_id/:favorite_id
favoriteRouter.get('/:user_id/:favorite_id', async (req, res) => {
  try {
    const favoriteData = await UserFavorite.findOne({
      include: [{ model: UserFavorite }],
      where: {
        user_id: req.params.user_id,
        favorite_id: req.params.favorite_id,
      },
    });
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// POST /favorites/new, { favorite_id: string, user_id: string }
favoriteRouter.post('/new', async (req, res) => {
  try {
    const favoriteData = await UserFavorite.create({
      favorite_id: req.body.favorite_id,
      user_id: req.body.user_id,
    });
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// DELETE /favorites/delete, { favorite_id: string, user_id: string }
favoriteRouter.delete('/delete', async (req, res) => {
  try {
    const favoriteData = await UserFavorite.destroy({
      where: {
        favorite_id: req.body.favorite_id,
        user_id: req.body.user_id,
      },
    });
    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = favoriteRouter;