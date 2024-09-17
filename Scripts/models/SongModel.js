import SongGenerationModel from "./SongGenerationModel.js";
import { getRandomString } from "../utils/random.js";

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
    metadata    = {
        url: "",
        title: "",
        description: "",
        image: "",
        audio: ""
    }

    constructor(metadata = {}) {
        this.name       = getRandomString(10);
        this.id         = this.returnId();
        this.metadata   = metadata;
    }

    returnId() {
        var res = this.name.trim().replace(/[\:\s]{1,}/gmi, "_").toLocaleLowerCase();
        if (this.isChild) {
            res = `${res} - ${this.parentSong.id}`;
        }
        this.id = res;
        return res;
    }
}

export default SongModel;