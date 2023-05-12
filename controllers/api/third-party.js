import express from 'express';
import yelp from 'yelp-fusion';
import fetch from 'node-fetch';

const apiKey = process.env.YELP_API_KEY;
const spoonacularApiKey = process.env.SPOONACULAR_API_KEY;
const client = yelp.client(apiKey);
const router = express.Router();

router.post('/yelp', (req, res, next) => {
  client.search({
    term: req.body.query,
    location: req.body.location,
  }).then(response => {
    console.log(response.jsonBody.businesses)
    res.send(response.jsonBody.businesses);
  }).catch(e => {
    console.log(e);
  });
});

router.post('/spoonacular', (req, res, next) => {
  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularApiKey}&query=${req.body.query}`)
    .then(response => response.json())
    .then(data => {
      const recipes = data.results.map(recipe => {
        return recipe.id;
      })
      fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${spoonacularApiKey}&ids=${recipes.join(',')}`)
        .then(response => response.json())
        .then(data => {
          res.send(data);
        });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

export default router;