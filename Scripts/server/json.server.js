import fs from "fs/promises";
import SongModel from "../../Models/SongModel";

/**
 * 
 * @param {SongModel} data 
 */
async function createJson(data) {
    const jsonContent = JSON.stringify(data);
    const path = "../_saves";

    try {
        await fs.writeFile(`${path}/${data.Id}.json`);
    } catch (e) {
        console.error(e);
    }
}

async function loadJson() {
    const path = "../_saves";
    const fileNames = await fs.readdir();
    
    try {
        const files = await Promise.all(fileNames.map(async (fn) => {
            const data = await fs.readFile(`${path}/${fn}`, { encoding: 'utf8'});
            return JSON.parse(data);
        })); 
        console.debug(files);
        return files;
    } catch (e) {
        console.error(e);
    }
}


export {
    createJson as CreateJSONFile,
    loadJson as LoadJSONFiles
}