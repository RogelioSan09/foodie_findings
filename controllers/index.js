//import the router module
const router = require('express').Router();

//created the routes for api and home
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const favoritesRoutes = require('./api/favorites-routes');

//assigned the middleware function homeRoutes to the root path
//assigned the middleware function apiRoutes to the /api path
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/favorites', favoritesRoutes);


//exports the router object
module.exports = router;