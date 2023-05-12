const router = require('express').Router();
const apiKey = 'e22651eb5e22452b9f588ff20e58e12b';
const { title } = require('process');
const sequelize = require('./config/connection');

// Create a MySQL connection pool
const pool = sequelize.createPool({
  user: 'root',
  password: 'password',
  database: 'recipe_db',
});
const favoriteRouter = require('express').Router();
const { Recipe } = require('../../models');

const apiKey = 'e22651eb5e22452b9f588ff20e58e12b';

// TODO: Function to search for recipes- filtered down to just what we need
// function searchRecipes(query) {
//   fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`)
//     .then(response => response.json())
//     .then(data => {
//       const recipes = data.results;
//       return recipes;
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }

router.get('/', async (req, res) => {
  try {
    const randomRecipes = fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=3&tags=${query}`);
    // Get all recipe, sorted by name, image, readyInMinutes
    const recipeData = await fetch().findAll({
      include: [
        {
          attributes: ['name', 'image', 'readyInMinutes'],
        },
      ]  
    });
    console.log("recipeData", recipeData);
    // Serialize recipe data so templates can read it
    const recipes = recipeData.map((project) => project.dataValues);
     console.log("recipes", recipes);
    // Pass serialized data into Handlebars.js template
    res.render('results', { recipes: recipes,  });
  } catch (err) {
    res.status(500).json(err);
  }
})

// Function to save recipes into the database
function saveRecipesToDatabase(recipes) {
  // Iterate over the recipes and save them into the database
  recipes.forEach(recipe => {
    // Save the recipe details to the database
    const { id, title } = recipe;
    // Prepare the SQL query
    const query = 'INSERT INTO recipes (id, title) VALUES (?, ?)';
    const values = [id, title];
    // Execute the query
    pool.query(query, values, (error, results) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log(`Saved recipe ${id} - ${title} to the database`);
      }
    });
  });
}
// function saveRecipesToDatabase(recipes) {
//   // Iterate over the recipes and save them into the database
//   recipes.forEach(recipe => {
//     // Save the recipe details to the database
//     const { id, title } = recipe;

//     // Prepare the SQL query
//     const query = 'INSERT INTO recipes (id, title) VALUES (?, ?)';
//     const values = [id, title];

//     // Execute the query
//     pool.query(query, values, (error, results) => {
//       if (error) {
//         console.error('Error:', error);
//       } else {
//         console.log(`Saved recipe ${id} - ${title} to the database`);
//       }
//     });
//   });
// }

// router.post('/', async (req, res) => {
//     try {
//       const dbRecipeData = await Recipe.create({
//         // a user object will be populated with a title, image, soureURL, and readyInMinutes
//         title: req.body.title,
//         image: req.body.image,
//         sourceURL: req.body.sourceURL,
//         readyInMinutes: req.body.readyInMinutes,
//       });
      
    res.status(200).json(dbRecipeData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
//     res.status(200).json(dbRecipeData);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });

module.exports = { searchRecipes }
