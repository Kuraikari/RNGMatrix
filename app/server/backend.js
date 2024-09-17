// BASE SETUP
// =============================================================================

// call the packages we need
import express, { Router } from 'express';        // call express
import bodyparser from 'body-parser';
import cors from 'cors';
import clc from 'cli-color';
import { LoadJSONFiles, CreateJSONFile, DeleteJSONFile, FindSongById } from './utils/json.js';
import ogs from 'open-graph-scraper';
import { isValidUrl } from './utils/validation.js';
import SongModel from '../../Scripts/models/SongModel.js';

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
    try {
    LoadJSONFiles()
        .then((resp) => resp)
        .then((data) => {
            res.send({ data });
        })
        .catch(reason => res.send(reason));
    } catch (e) {
        console.error(clc.red(e));
        res.status(500).send(e);
    }
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
        console.error(clc.red(error));
        res.status(500).send(error);
    }
});

backendRouter.delete("/song/:songId", function (req, res) {
    try {
        DeleteJSONFile(req.params.songId)
        .then((resp) => resp)
        .then((data) => res.status(200).send("OK"))
        .catch(reason => res.status(500).send(reason));
    } catch (e) {
        console.error(clc.red(e));
        res.status(500).send(e);
    }
})

backendRouter.post("/song", async function (req, res) {
    try {
        const { name, description, fullLyrics, isFinished, url, songGenerations } = req.body;
        let metadata = {};

        if (!!url) {
            const options = { url };
            const { error, result } = await ogs(options);
            
            if (error) {
                console.error('Open Graph Scraper Error: ', error);
                return res.status(500).json({error: 'Error fetching URL metdata'});
            }
    
            metadata = {
                url: url,
                title: result.ogTitle || result.title || 'No title found',
                description: result.ogDescription || result.description || 'No description found',
                image: result.ogImage[0].url || 'default-image.png',
                audio: result.ogAudioURL || 'No audio found'
            };

            console.debug(result);
            console.debug(result.ogImage);
            console.debug(metadata);
        }

        
        const SongModel = (await import("../../Scripts/models/SongModel.js")).default;
        const SongGenerationModel = (await import("../../Scripts/models/SongGenerationModel.js")).default;
        const song = new SongModel(metadata);

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

backendRouter.get('/song/:songId/song-url', async function (req, res){
    let id = req.params.songId;
    const url = req.body.url;

    if (!isValidUrl(url)) {
        return res.status(400).json({error: 'Invalid URL format'});
    }

    try {
        const options = { url };
        const { error, result } = await ogs(options);
        
        if (error) {
            console.error('Open Graph Scraper Error: ', error);
            return res.status(500).json({error: 'Error fetching URL metdata'});
        }

        const metadata = {
            url: url,
            title: result.ogTitle || result.title || 'No title found',
            description: result.ogDescription || result.description || 'No description found',
            image: result.ogImage?.url || 'default-image.png',
            audio: result.ogAudio?.url || 'No audio found'
        };

        let song = await FindSongById();
        if (!song) {
            return res.status(404).json({error: 'Song not found'});
        }

        res.json(metadata);
    } catch (err) {
        console.error('Server Error: ', err);
        res.status(500).json({error: 'Server error'});
    }
})

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
backend.use('/api', backendRouter);

export { backend as backendListen };
