// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var backend    = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors       = require('cors');
var json       = require('./utils/json.js');

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

backendRouter.get("/songs", function(req, res) {
    json.LoadJSONFiles()
    .then((resp) => resp)
    .then((data) => {
        console.debug(data);
        res.send({ data });
    })
    .then(reason => res.send(reason));
});

backendRouter.get("/song/:id", function(req, res) {
    json.LoadJSONFiles()
    .then((resp) => resp)
    .then((data) => {
        console.debug(data);
        res.send({ data });
    })
    .catch(reason => res.send(reason));
});

backendRouter.post("/song", function(req, res) {
    try {
       const {data} = req.body;
       const SongModel = require("../../Models/SongModel.js");
       const defaultSong = new SongModel();
       defaultSong.name

       json.CreateJSONFile(defaultSong)
        .then((resp) => resp)
        .then((data) => {
            res.send({ data });
        })
        .catch(reason => res.send(reason));

    } catch (error) {
        const SongModel = require("../../Models/SongModel.js");
        const defaultSong = new SongModel();
        defaultSong.id = Number.parseInt(Math.random()*100);

        json.CreateJSONFile(defaultSong)
        .then((resp) => resp)
        .then((data) => {
            res.send({ data });
        })
        .catch(reason => res.send(reason));
    }
    
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
backend.use('/api', backendRouter);

module.exports = backend;
