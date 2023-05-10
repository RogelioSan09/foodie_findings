const apiKey = 'e22651eb5e22452b9f588ff20e58e12b';
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: '',
  user: '',
  password: '',
  database: '',
});

// Function to search for recipes
function searchRecipes(query) {
  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`)
    .then(response => response.json())
    .then(data => {
      const recipes = data.results;
      // Handle and save the search results into the database
      saveRecipesToDatabase(recipes);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

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

// Example0
searchRecipes('chicken'); // Search for recipes containing "chicken"

