const homeRouter = require('express').Router();
// Import the custom middleware
const {withAuth, areAuth } = require('../utils/auth');

// TODO set up route for main page
// 
// get
homeRouter.get('/', (req, res) => {
    res.render('main');
});

// TODO set up routes for results page
// /results
// get
homeRouter.get('/results', (req, res) => {
    res.render('main');
})

// TODO set up route for favorites page
// /favorites
// get
homeRouter.get('/favorites', (req, res) => {
    res.render('favorites');
})

homeRouter.get('/login', (req, res) => {
    res.render('login');
});

module.exports = homeRouter;