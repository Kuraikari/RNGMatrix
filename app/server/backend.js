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

const backend = express();                 // define our app using express
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
backendRouter.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

backendRouter.get("/status", function (req, res) {
    res.send({ message: backend.get("title") + ' is running' });
});

backendRouter.get("/songs", function (req, res) {
    LoadJSONFiles()
        .then((resp) => resp)
        .then((data) => {
            res.send({ data });
        })
        .catch(reason => res.send(reason));
});

backendRouter.post("/song/:songId", function (req, res) {
    try {
        LoadJSONFiles()
        .then((resp) => resp)
        .then((data) => {
            if (Array.isArray(data)) {
                let id = req.params.songId;
                const isIdNaN = Number.isNaN(parseInt(id));
                id = isIdNaN ? id : parseInt(id);
                const song = data.filter((d) => {
                    return d.id === id;
                }).at(0);
                res.send(song);
            }
        })
        .catch(reason => res.send(reason));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
    
});

backendRouter.post("/song", async function (req, res) {
    try {
        const { name, description, fullLyrics, isFinished, songGenerations } = req.body;
        const SongModel = (await import("../../Scripts/models/SongModel.js")).default;
        const SongGenerationModel = (await import("../../Scripts/models/SongGenerationModel.js")).default;
        const song = new SongModel();
        song.name = name;
        song.description = description;
        song.fullLyrics = fullLyrics;
        song.isFinished = isFinished === "on" ? true : false;

        if (Array.isArray(songGenerations)) {
            songGenerations.forEach((songGen) => {
                const songGeneration = new SongGenerationModel();
                song.id = 1;
                songGeneration.prompt = songGen.prompt;
                songGeneration.lyrics = songGen.lyrics;
                songGeneration.advancedSettings = ({
                    ...songGeneration.advancedSettings,
                    ...songGen.advancedSettings
                });
                song.songGenerations.push(songGeneration);
            });
        }
        song.id = song.returnId();

        CreateJSONFile(song)
            .then((resp) => resp)
            .then((data) => {
                res.send({ data });
            })
            .catch(reason => res.send(reason));

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
backend.use('/api', backendRouter);

export { backend as backendListen };
