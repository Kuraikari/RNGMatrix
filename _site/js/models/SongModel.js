import SongGenerationModel from "./SongGenerationModel.js";
import { getRandomString } from "./../utils/random.js";

/**
 * Model class for udio generations
 */
class SongModel {
    id          = "0";
    name        = "";
    description = "";
    fullLyrics  = null;
    /**
     * @type {Array<SongGenerationModel>}
     */
    songGenerations = [];
    /** 
     * @type {SongModel}
     */
    parentSong  = null;
    isChild     = !!this.parentSong ? true : false;
    isFinished  = false;

    constructor() {
        this.name   = getRandomString(10);
        this.id     = this.returnId();
    }

    returnId() {
        var res = this.name;
        if (this.isChild) {
            res = `${res} - ${this.parentSong.id}`;
        }
        this.id = res;
        return res;
    }
}

export default SongModel;