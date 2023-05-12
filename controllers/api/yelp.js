// Get category by alias from the Yelp API
const sdk = require('api')('@yelp-developers/v1.0#18val1olf6o9kfr');
// query = the food or whatever

// TODO Create searchRestaurants function - we want the data to be filtered down to just what we need
function searchRestaurants(query) {
  sdk.v3_categories({alias: query})
    .then(({ data }) => {
      return data.json();
    })
    .catch(err => console.error(err));
}