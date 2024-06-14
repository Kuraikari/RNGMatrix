
/**
 * FRONTEND
 */
// call the packages we need
import express, { Router, static as eStatic} from 'express';        // call express
import { join } from 'path';
import * as url from 'url';
import nunjucks from 'nunjucks';

import { fetchData } from './api/api.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

var frontend   = express();                 // define our app using express
var frontendRouter = Router();              // get an instance of the express Router

nunjucks.configure('_site', {
	autoescape: true,
	express: frontend
});

frontend.use("/css", eStatic(join('./_site/css')));
frontend.use("/js", eStatic(join('./_site/js')));
frontend.set('views', __dirname + '/_site');
frontend.set('view engine', 'html');

frontendRouter.get('/', (req, res) => {
	res.render('index.html');
 });

frontendRouter.get('/song', (req, res) => {
	res.render('song/index.html')
})

frontendRouter.get('/song/:id', (req, res) => {
	res.render('song/index.html', {
		root: './_site',
		data: fetchData(req.params.id)
	})
})

frontend.use('/', frontendRouter);

export {frontend as frontendListen};
