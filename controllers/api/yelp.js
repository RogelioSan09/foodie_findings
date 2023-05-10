// Get category by alias from the Yelp API
const sdk = require('api')('@yelp-developers/v1.0#18val1olf6o9kfr');

sdk.v3_categories({alias: 'alias'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));