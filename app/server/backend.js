// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var backend    = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
backend.use(bodyParser.urlencoded({ extended: true }));
backend.use(bodyParser.json());

var backendPort = process.env.BACKENDPORT  || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var backendRouter = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
backendRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
backend.use('/api', backendRouter);

module.exports = backend;
