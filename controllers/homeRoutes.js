import express from 'express';
// Import the custom middleware
import withAuth from '../utils/auth.js';

const homeRouter = express.Router();
// TODO set up route for main page
// 
// get
homeRouter.get('/', withAuth, (req, res, next) => {
    res.render('main', { layout: 'search' });
});

// TODO set up routes for results page
// /results
// get
homeRouter.get('/results', withAuth, (req, res) => {
    res.render('main', { layout: 'results' });
})

// TODO set up route for favorites page
// /favorites
// get
homeRouter.get('/favorites', withAuth, (req, res) => {
    res.render('main', { layout: 'favorites' });
})

homeRouter.get('/login', (req, res) => {
    res.render('main', { layout: 'login' });
});

export default homeRouter;