// imported express router module 
import express from 'express';

// imports data stored within User found at the models route
import Models from '../../models/index.js';

const { User } = Models;

const router = express.Router();
// Will create a new user
router.post('/new', async (req, res) => {
    try {
      console.log(req.body)
      const dbUserData = await User.create({
        // a user object will be populated with a username, username, and password
        username: req.body.username,
        password: req.body.password,
      });
      
      // Will save the current user's session when they log-in
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user = {
          username: dbUserData.username,
          id: dbUserData.id,
        }
  
        res.status(200).json({
          username: dbUserData.username,
          id: dbUserData.id,
        });
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
      // When there is no email matching the user's input
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
        req.session.user = {
          username: dbUserData.username,
          id: dbUserData.id,
        }
  
        res
          .status(200)
          .json({
            username: dbUserData.username,
            id: dbUserData.id,
          });
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

export default router;