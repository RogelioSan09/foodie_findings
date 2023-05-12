
// const sequelize  = require('sequelize');
// const { Restaurant, Recipe } = require('../');

// const seedDatabase = async () => {
//     try {
//         // seed restaurants
//         const restaurantData = await fetchRestaurantsFromYelp();
//         await restaurantData.bulkCreate(restaurantData);
//         //seed recipes
//         const recipeData = await fetchRecipesFromSpoonacular();
//         await recipeData.bulkCreate(recipeData);

//         console.log('Database seeding completed successfully.');
//         process.exit(0);
//     }   catch (error) {
//         console.error('Database seeding failed:', error);
//         process.exit(1);
//     }
// };

// const fetchRestaurantsFromYelp = async () => {
//     //make API request to yelp fusion API to fetch restaurant data
//     try {
//         const response = await fetch(''); //YELP_PLACEHOLDER
//         const restaurantData = await response.json(); //process and extract relevent data from the response
//         return restaurantData;
//     }   catch (error) {
//         console.error('Failed to fetch restaurants from Yelp Fusion API:', error);
//         throw error;
//     }
// };

// const fetchRecipesFromSpoonacular = async () => {
//     //make API request to spoonacular API to fetch recipe data
//     try {
//         const response = await fetch(''); //SPOONACULAR_PLACEHOLDER
//         const recipeData = await response.json(); //process and extract relevent data from the response
//         return recipeData;
//     }   catch (error) {
//         console.error('Failed to fetch recipes from Spoonacular API:', error);
//         throw error;
//     }
// };

// sequelize
//     .sync({ force: true })
//     .then(() => seedDatabase())
//     .catch((error) => {
//         console.error('Database synchronization failed:', erorr);
//         process.exit(1);
//     });
