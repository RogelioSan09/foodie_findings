const router = require('express').Router();

const userRoutes = require('./user-routes');

//assigned the middleware function apiRoutes to the /user path
router.use('/user', userRoutes);

module.exports = router;