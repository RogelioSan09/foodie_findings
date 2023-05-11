const apiKey = 'e22651eb5e22452b9f588ff20e58e12b';
// const mysql = require('mysql');
const { title } = require('process');

// Create a MySQL connection pool
// const pool = mysql.createPool({
//   host: '',
//   user: 'root',
//   password: 'password',
//   database: 'recipe_db',
// });

// Function to search for recipes
function searchRecipes(query) {
  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`)
    .then(response => response.json())
    .then(data => {
      const recipes = data.results;
      return recipes;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to save recipes into the database
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
      
//     res.status(200).json(dbRecipeData);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });

// Example
searchRecipes('chicken'); // Search for recipes containing "chicken"