const router = require('express').Router();
// Import the custom middleware
const {withAuth, areAuth } = require('../utils/auth');

router.get('/login', areAuth, (req, res) => {
    res.render('login');
});
  
module.exports = router;