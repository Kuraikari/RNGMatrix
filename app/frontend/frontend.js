
/**
 * FRONTEND
 */
// call the packages we need
var express    = require('express');        // call express
var path 	   = require('path');

var frontend   = express();                 // define our app using express
var frontendPort = process.env.FRONTENDPORT || 3001;        // set our port
var frontendRouter = express.Router();              // get an instance of the express Router

frontend.use("/css", express.static(path.join(__dirname, '/_site/css')));
frontend.use("/js", express.static(path.join(__dirname, '/_site/js')));
frontend.set('views', __dirname + '/_site');

frontendRouter.get('/', (req, res) => {
	res.sendFile('index.html', {
	  root: './_site'
	});
 });

frontend.use('/', frontendRouter);

module.exports = frontend;
