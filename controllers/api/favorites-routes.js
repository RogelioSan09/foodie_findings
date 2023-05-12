import express from'express';

import Models from '../../models/index.js';

const { UserFavorite } = Models;

const favoriteRouter = express.Router();

// GET /favorites/:user_id
favoriteRouter.get('/:user_id', async (req, res) => {
  const favoriteData = await UserFavorite.findAll({
    attributes: [
      'favorite_id',
      'user_id',
    ],
    where: {
      user_id: req.params.user_id,
    },
  });
  if (!favoriteData) {
    res.status(200).json(favoriteData);
  } else {
    res.status(404).json({ message: 'No favorites found with this id!' });
  }
})

// GET /favorites/:user_id/:favorite_id
favoriteRouter.get('/:user_id/:favorite_id', async (req, res) => {
  const favoriteData = await UserFavorite.findOne({
    attributes: [
      'favorite_id',
      'user_id',
    ],
    where: {
      user_id: req.params.user_id,
      favorite_id: req.params.favorite_id,
    },
  });
  if (!favoriteData) {
    res.status(200).json(favoriteData);
  } else {
    res.status(404).json({ message: 'No favorite found with this id!' });
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

export default favoriteRouter;