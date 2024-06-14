// BASE SETUP
// =============================================================================

// call the packages we need
import express, { Router } from 'express';        // call express
import bodyparser from 'body-parser';
import cors from 'cors';
import { LoadJSONFiles, CreateJSONFile } from './utils/json.js';

const title = "RNG-Backend";
const email = "zwermi@gmail.com";
const backendVersion = "0.1.0";

const backend    = express();                 // define our app using express
backend.set('title', title);
backend.set('email', email);
backend.set('version', backendVersion);

backend.use(cors())

// configure app to use bodyParser()
// this will let us get the data from a POST
backend.use(bodyparser.urlencoded({ extended: true }));
backend.use(bodyparser.json());

// ROUTES FOR OUR API
// =============================================================================
var backendRouter = Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
backendRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

backendRouter.get("/status", function(req, res) {
    res.send({ message: backend.get("title") + ' is running'});
});

backendRouter.get("/songs", function(req, res) {
    LoadJSONFiles()
    .then((resp) => resp)
    .then((data) => {
        console.debug(data);
        res.send({ data });
    })
    .catch(reason => res.send(reason));
});

backendRouter.post("/song/:id", function(req, res) {
    LoadJSONFiles()
    .then((resp) => resp)
    .then((data) => {
        if (Array.isArray(data)){
            const song = data.filter((d) => parseInt(req.params.id) === d.id).at(-1);
            console.debug(song);
            res.send({ song });
        }
    })
    .catch(reason => res.send(reason));
});

backendRouter.post("/song", function(req, res) {
    try {
       const { data } = req.body;
       const SongModel = require("../../Models/SongModel.js").default;
       const defaultSong = new SongModel();
       console.debug(data);

    //    CreateJSONFile(defaultSong)
    //     .then((resp) => resp)
    //     .then((data) => {
    //         res.send({ data });
    //     })
    //     .catch(reason => res.send(reason));

    } catch (error) {
        console.error(error);
        // const SongModel = require("../../Models/SongModel.js").default;
        // const defaultSong = new SongModel();
        // defaultSong.id = Number.parseInt(Math.random()*10000);

        // CreateJSONFile(defaultSong)
        // .then((resp) => resp)
        // .then((data) => {
        //     res.send({ data });
        // })
        // .catch(reason => res.send(reason));
    }
    
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
backend.use('/api', backendRouter);

export { backend as backendListen };
