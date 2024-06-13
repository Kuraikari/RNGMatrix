import { writeFile, readdir, readFile } from "fs/promises";
import SongModel from "../../../Scripts/models/SongModel.js";

/**
 * 
 * @param {SongModel} data 
 */
async function createJson(data) {
    const jsonContent = JSON.stringify(data);
    const path = "./_saves";

    try {
        await writeFile(`${path}/${data.returnId()}.json`, jsonContent);
    } catch (e) {
        console.error(e);
    }
}

async function loadJson() {
    const path = "./_saves";
    const fileNames = await readdir(path);
    
    try {
        const files = await Promise.all(fileNames.map(async (fn) => {
            const data = await readFile(`${path}/${fn}`, { encoding: 'utf8'});
            return JSON.parse(data);
        })); 
        console.debug(files);
        return files;
    } catch (e) {
        console.error(e);
    }
}

export const CreateJSONFile = createJson;
export const LoadJSONFiles = loadJson;