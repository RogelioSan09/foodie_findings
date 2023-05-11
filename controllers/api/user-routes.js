// imported express router module 
const router = require('express').Router();
// imports data stored within User found at the models route
const { User } = require('../../models');

// Will create a new user
router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create({
        // a user object will be populated with a username, username, and password
        username: req.body.username,
        password: req.body.password,
      });
      
      // Will save the current user's session when they log-in
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// The POST function is executed at the /login path
router.post('/login', async (req, res) => {
    // will attempt to execute the following 
    try {
        // Will search for the user's username within the user database
      const dbUserData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      // When there is no username matching the user's input
      // a response is returned indicating the user's input was incorrect
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Upon being called, a POST operation is performed at the /logout directory
router.post('/logout', (req, res) => {
    // If user is logged in, then the session will be deleted
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;