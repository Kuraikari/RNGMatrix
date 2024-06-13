
/**
 * FRONTEND
 */
// call the packages we need
import express, { Router, static as eStatic} from 'express';        // call express
import { join } from 'path';
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

var frontend   = express();                 // define our app using express
var frontendRouter = Router();              // get an instance of the express Router

frontend.use("/css", eStatic(join('./_site/css')));
frontend.use("/js", eStatic(join('./_site/js')));
frontend.set('views', __dirname + '/_site');

frontendRouter.get('/', (req, res) => {
	res.sendFile('index.html', {
	  root: './_site'
	});
 });

frontend.use('/', frontendRouter);

export {frontend as frontendListen};
