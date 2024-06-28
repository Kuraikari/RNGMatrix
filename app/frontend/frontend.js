
/**
 * * FRONTEND
 * This is the frontend server
 */

// call the packages we need
import express from 'express';        // call express
import { join } from 'path';
import * as url from 'url';
import nunjucks from 'nunjucks';

import { fetchData, deleteData } from './api/api.js';

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

/**
 * UUID generator
 * @returns {string}
 */
function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
		.replace(/[xy]/g, function (c) {
		const r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
		});
}

env.addGlobal('uuid', () => uuidv4());

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

frontendRouter.get('/song/delete/:id', async (req, res) => {
	deleteData(req.params.id)
	.then(data => data)
	.then(()=> {
		res.render('home/index.njk');
	})
	.catch(reason => res.send(reason));
});

frontend.use('/', frontendRouter);

export {frontend as frontendListen};
