const router = require('express').Router();
// Import the custom middleware
const {withAuth, areAuth } = require('../utils/auth');

router.get('/login', areAuth, (req, res) => {
    res.render('login');
});

// TODO set up route for search page
// /
// get

// TODO set up routes for results page
// /results
// get

// TODO set up route for favorites page
// /favorites
// get
  
module.exports = router;