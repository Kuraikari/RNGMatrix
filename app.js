// BASE SETUP
// =============================================================================
import clc from 'cli-color';
import { backendListen } from "./app/server/backend.js";
import { frontendListen } from "./app/frontend/frontend.js";

const backendPort = process.env.APP_BACKENDPORT || 3000;
const frontendPort = process.env.APP_FRONTENDPORT || 3001;        // set our port

backendListen.listen(backendPort);

const curData = `[${clc.white((new Date()).toLocaleTimeString())}] `;
console.log(curData + 'Backend: ' + clc.blue('http://localhost:' + backendPort));

frontendListen.listen(frontendPort);
console.log(curData + 'Frontend: ' + clc.blue('http://localhost:' + frontendPort));