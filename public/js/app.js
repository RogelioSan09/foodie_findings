import searchRecipes from "./spoonacular.js";
import searchRestaurants from "./yelp.js";

import recipeTemplate from '../partials/recipes.js';
import restaurantTemplate from '../partials/restaurants.js';

// create a helper that gets user object from localStorage
function getUser () {
    return JSON.parse(localStorage.getItem("user"));
}

async function isFavorited (userId, favorite_id) {
  const response = await fetch(`/favorites/${userId}/${favorite_id}`)
  const data = await response.json();
  return data !== null;
}

function search (query, location) {
  // get the value from the search form and pass to searchRecipes and searchRestaurants
  // use searchRecipes from spoonacular.js
  // use searchRestaurants from yelp.js
  // use render to render the results
  // TODO add error handling (if any of the promises fail, show an error message)
  Promise.all([
    // searchRecipes(query),
    searchRestaurants(query, location)
  ])
    .then(([
      // recipes,
      restaurants
    ]) => {
      // [
      //   {
      //     id: '8ef0hw092hrjf0sdfh',
      //     name: "Restaurant 1",
      //     image_url: 'https://via.placeholder.com/150',
      //     distance: 5,
      //     isFavorited: true
      //   }
      // ]
      // loop over the data and add a property to each item called isFavorited
      // if the item is in our database, set isFavorited to true
      // otherwise set it to false
      const { id: userId } = getUser();

      // loop over restaurants and add isFavorited property
      restaurants.forEach(async (restaurant) => {
        const { id: favorite_id } = restaurant;
        if (restaurant.image_url === "") {
          restaurant.image_url = "/images/dinner-placeholder-image.jpg";
        }
        restaurant.distanceInMiles = (restaurant.distance * 0.000621371).toFixed(1);
        restaurant.isFavorited = await isFavorited(userId, favorite_id);
      });
      
      // loop over recipes and add isFavorited property
      // recipes.forEach(async (recipe) => {
      //   const { id: favorite_id } = recipe;
      //   if (!recipe.image) {
      //     recipe.image = "/images/dinner-placeholder-image.jpg";
      //   }
      //   recipe.isFavorited = await isFavorited(userId, favorite_id);
      // });

      render(
        restaurants,
        // recipes
      );
    })
}

function render (
  restaurants, 
  // recipes
) {
  const renderRestaurants = Handlebars.compile(restaurantTemplate);
  // const renderRecipes = Handlebars.compile(recipeTemplate);

  document.getElementById("restaurants-results").innerHTML = renderRestaurants({ restaurants });
  // document.getElementById("recipes-results").innerHTML = renderRecipes({ recipes });
  const hidden = document.querySelector('.hide');
  if (hidden) {
    hidden.classList.remove('hide');
  }
}

function init () {
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.getElementById("search-input").value;
    const location = document.getElementById("location-input").value;
    search(query, location);
  });
}

// call init when document is finished loading
document.addEventListener("DOMContentLoaded", init);