import express from 'express';

import userRoutes from './user-routes.js';
import thirdPartyRoutes from './third-party.js';

const router = express.Router();

//assigned the middleware function apiRoutes to the /user path
router.use('/user', userRoutes);
router.use('/third-party', thirdPartyRoutes);

export default router;