// Front end API call to our api which calls spoonacular api
// TODO: Function to search for recipes- filtered down to just what we need
async function searchRecipes(query) {
  const results = await fetch(`/api/third-party/spoonacular`, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: new URLSearchParams({ query }),
  })
  return results.json();
}

export default searchRecipes;