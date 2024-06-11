// BASE SETUP
// =============================================================================
const backend = require("./app/server/backend.js");
const frontend = require("./app/frontend/frontend.js");

const backendPort = process.env.APP_BACKENDPORT || 3000;
const frontendPort = process.env.APP_FRONTENDPORT || 3001;        // set our port

backend.listen(backendPort);
console.log((new Date()).toLocaleTimeString() + " $ " + 'Backend happens on port ' + backendPort);

frontend.listen(frontendPort);
console.log((new Date()).toLocaleTimeString() + " $ " + 'Frontend happens on port ' + frontendPort);