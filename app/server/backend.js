// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var backend    = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors       = require('cors');

const title = "RNG-Backend";
const email = "zwermi@gmail.com";
const backendVersion = "0.1.0";

backend.set('title', title);
backend.set('email', email);
backend.set('version', backendVersion);

backend.use(cors())

// configure app to use bodyParser()
// this will let us get the data from a POST
backend.use(bodyParser.urlencoded({ extended: true }));
backend.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var backendRouter = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
backendRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

backendRouter.get("/status", function(req, res) {
    res.send({ message: backend.get("title") + ' is running'});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
backend.use('/api', backendRouter);

module.exports = backend;
