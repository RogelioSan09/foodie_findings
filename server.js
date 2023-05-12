//imported path modules for handling file and directory paths
import path from 'path';
//imported express module, web application framework for Node.js
import express from 'express';
//imported the express-session module for handling sessions in Express.js
import session from 'express-session';
//imported the express-handlebars module, the handlebars templating language
import exhbs from 'express-handlebars';
//assigned the value of the exported object from the ./controllers module
import routes from './controllers/index.js';
//assigned the value of the exported object from the ./utils/helpers module
import helpers from './utils/helpers.js';
//assigned the value of the exported object from the ./config/connection module
//sets up for the connection to the database using sequelize
import sequelize from './config/connection.js';
import fileDirName from './utils/fileDirName.js';
//sets up for storing user session data in a database
import connectSessionSequelize from 'connect-session-sequelize';
const SequelizeStore = connectSessionSequelize(session.Store);

const { __dirname } = fileDirName(import.meta);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exhbs.create({ helpers });

//created an object to store the users session
const sess = {
    secret: 'Super Duper secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
};

// executes the session
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'assets')));

// use method called to execute the routes middleware
app.use(routes);

// Will run the sync method on sequelize object, synchronizing any defined models
// with the database by creating tables and associations.
// force: false will prevent dropping and recreating any existing tables
// Return a promise after sync and the callback function executes
sequelize.sync({ force: false }).then(() => {
    // Initiates the server to start listening on PORT
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});