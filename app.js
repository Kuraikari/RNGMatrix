// BASE SETUP
// =============================================================================
import { backendListen } from "./app/server/backend.js";
import { frontendListen } from "./app/frontend/frontend.js";

const backendPort = process.env.APP_BACKENDPORT || 3000;
const frontendPort = process.env.APP_FRONTENDPORT || 3001;        // set our port

backendListen.listen(backendPort);
console.log((new Date()).toLocaleTimeString() + " $ " + 'Backend happens on port ' + backendPort);

frontendListen.listen(frontendPort);
console.log((new Date()).toLocaleTimeString() + " $ " + 'Frontend happens on port ' + frontendPort);