// BASE SETUP
// =============================================================================
const backend = require("./app/server/backend.js");
const frontend = require("./app/frontend/frontend.js");

const backendPort = process.env.BACKENDPORT || 3000;
const frontendPort = process.env.FRONTENDPORT || 3001;        // set our port

backend.listen(backendPort);
console.log('Backend happens on port ' + backendPort);

frontend.listen(frontendPort);
console.log('Frontend happens on port ' + frontendPort);
