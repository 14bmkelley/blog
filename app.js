
'use strict';

// Import local packages.

let http        = require('http');
let express     = require('express');
let bodyParser  = require('body-parser');
let morgan      = require('morgan');
let firebase    = require('firebase');



// Import local files.

let controllers = require('./controllers/index.js');



// Connect to firebase.

let firebaseConfig = {
    apiKey: "AIzaSyBQFFsMI9untRzl1kJNbhoEM8U1rzc3Xvk",
    authDomain: "uniq-b59e7.firebaseapp.com",
    databaseURL: "https://uniq-b59e7.firebaseio.com",
    projectId: "uniq-b59e7",
    storageBucket: "uniq-b59e7.appspot.com",
    messagingSenderId: "293321413714"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.database();



// Create application.

let app = express();



// Initialize application middleware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));



// Configure application settings.

app.set('views', './views')
app.set('view engine', 'ejs')



// Route the application.

let router = express.Router();
let context = {};

app.use(express.static('./static'));
app.use(controllers.map(router, context));



// Start the express server.

http.createServer(app).listen(8000);

