// Front end request to our api, which requests the yelp api
// Create searchRestaurants function - we want the data to be filtered down to just what we need
async function searchRestaurants(query, location) {
  const results = await fetch('/api/third-party/yelp', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: new URLSearchParams({ query, location })
  })
  return results.json();
}

export default searchRestaurants;