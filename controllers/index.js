//import the router module
import { Router } from 'express';

//created the routes for api and home
import apiRoutes from './api/index.js';
import homeRoutes from './homeRoutes.js';
import favoritesRoutes from './api/favorites-routes.js';

const router = Router();

//assigned the middleware function homeRoutes to the root path
//assigned the middleware function apiRoutes to the /api path
router.use(homeRoutes);
router.use('/api', apiRoutes);
router.use('/favorites', favoritesRoutes);

//exports the router object
export default router;