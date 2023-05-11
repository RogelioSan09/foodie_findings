const searchRecipes = require("../controllers/api/spoonacular");
const searchRestaurants = require("../controllers/api/yelp");

const recipeTemplate = require("../views/partials/recipes.handlebars");
const restaurantTemplate = require("../views/partials/restaurants.handlebars");

// create a helper that gets user object from localStorage
function getUser () {
    return JSON.parse(localStorage.getItem("user"));
}

function isFavorited (userId, favorite_id) {
  fetch(`/favorites/${userId}/${favorite_id}`)
    .then((response) => response.json())
    .then((data) => {
      // return data; // { user_id: 1, favorite_id: 1 } || null
      // if data is not null, return true, else return false
      return data !== null;
    });
}

function favorite (favorite_id, isFavorited) {
  const { id: userId } = getUser();

  // if isFavorited is true, delete the favorite
  if (isFavorited) {
    fetch(`/favorites/delete`, {
      method: "DELETE",
      body: {
        favorite_id,
        user_id: userId
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // data = 1
        if (data === 1) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        // TODO handle error
      });
  } else {
    // if isFavorited is false, create the favorite
    fetch(`/favorites/new`, {
      method: "POST",
      body: {
        favorite_id,
        user_id: userId
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 1) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        // TODO handle error
      });
  }
}

function search (query) {
  // get the value from the search form and pass to searchRecipes and searchRestaurants
  // use searchRecipes from spoonacular.js
  // use searchRestaurants from yelp.js
  // use render to render the results
  // TODO add error handling (if any of the promises fail, show an error message)
  Promise.all([searchRecipes(query), searchRestaurants(query)])
    .then(([recipes, restaurants]) => {
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
      restaurants.forEach((restaurant) => {
        const { id: favorite_id } = restaurant;
        restaurant.isFavorited = isFavorited(userId, favorite_id);
      });
      
      // loop over recipes and add isFavorited property
      recipes.forEach((recipe) => {
        const { id: favorite_id } = recipe;
        recipe.isFavorited = isFavorited(userId, favorite_id);
      });

      render(restaurants, recipes);
    })
}

function render (restaurants, recipes) {
  const renderRestaurants = Handlebars.compile(restaurantTemplate);
  const renderRecipes = Handlebars.compile(recipeTemplate);

  document.getElementById("restaurants-results").innerHTML = renderRestaurants({ restaurants });
  document.getElementById("recipes-results").innerHTML = renderRecipes({ recipes });
}

function init () {
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.getElementById("search-input").value;
    search(query);
  });

  const restaurantResults = document.querySelectorAll("#restaurants-results");
  const recipeResults = document.querySelectorAll("#recipes-results");
  const liked = "♥️";
  const unliked = "♡";

  const handleFavoriteClick = async (event) => {
    if (event.target.classList.contains("favorite-button")) {
      const button = event.target;
      button.disabled = true;
      button.classList.add("disabled");

      const favorite_id = button.dataset.favoriteId;
      const isFavorited = button.dataset.isFavorited;

      if (isFavorited) {
        button.innerText = unliked;
      } else {
        button.innerText = liked;
      }

      await favorite(favorite_id, isFavorited);
      button.disabled = false;
      button.classList.remove("disabled");
    }

    restaurantResults.addEventListener("click", handleFavoriteClick);
    recipeResults.addEventListener("click", handleFavoriteClick);
  }
}

// call init when document is finished loading
document.addEventListener("DOMContentLoaded", init);
