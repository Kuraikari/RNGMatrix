
/**
 * FRONTEND
 */
// call the packages we need
import express from 'express';        // call express
import { join } from 'path';
import * as url from 'url';
import nunjucks from 'nunjucks';

import { fetchData } from './api/api.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

var frontend   = express();                 // define our app using express
var frontendRouter = express.Router();              // get an instance of the express Router

frontend.use("/css", express.static(join('./_site/css')));
frontend.use("/js", express.static(join('./_site/js')));
frontend.set('view engine', 'njk');

var env = nunjucks.configure(['views', '_includes', '_includes/components'], {
	autoescape: true,
	express: frontend,
	watch: true
});

frontendRouter.get('/', (req, res) => {
	fetchData(null)
	.then(data => data)
	.then((songModel)=> {
		res.render('home/index.njk', { songModel: songModel.data });
	})
 });

frontendRouter.get('/song', (req, res) => {
	res.render('song/index.njk')
});

frontendRouter.get('/song/:id', async (req, res) => {
	fetchData(req.params.id)
	.then(data => data)
	.then((songModel)=> {
		res.render('song/index.njk', { songModel });
	})
	.catch(reason => res.send(reason));
});

frontend.use('/', frontendRouter);

export {frontend as frontendListen};
