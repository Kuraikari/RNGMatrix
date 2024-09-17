import { writeFile, readdir, readFile, rm } from "fs/promises";
import SongModel from "../../../Scripts/models/SongModel.js";
import { JsonDataError } from "./errors/customerrors.js";

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
        throw new JsonDataError("Can't write to JSON: \n" + e, 500, "POST/PUT");
    }
}

/**
 * Loads the json from the saves folder
 * @returns {Promise<Array<object>>} array of the parsed JSON objects from the save files
 */
async function loadJson() {
    const path = "./_saves";
    const fileNames = await readdir(path);
    
    try {
        const files = await Promise.all(fileNames.map(async (fn) => {
            const data = await readFile(`${path}/${fn}`, { encoding: 'utf8'});
            return JSON.parse(data);
        }));
        return files;
    } catch (e) {
        console.error(e);
        throw new JsonDataError("Can't load JSON: \n" + e, 500, "GET");
    }
}

/**
 * 
 * @param {string} filename 
 */
async function deleteJson(filename) {
    const path = "./_saves";
    const fileNames = await readdir(path);

    if (fileNames.includes(filename + ".json")) {
        try {
            rm(`${path}/${filename + '.json'}`);
        } catch (e) {
            throw new JsonDataError("Can't delete JSON: \n" + e, 500, "DELETE");
        }
    }
}

/**
 * 
 * @param {any} id 
 * @returns 
 */
async function findSongById(id) {
    const songs = await loadJson();
    const song = songs.filter(x => x.id === id)?.at(0);
    return song;
}

export const CreateJSONFile = createJson;
export const LoadJSONFiles  = loadJson;
export const FindSongById   = findSongById;
export const DeleteJSONFile = deleteJson;