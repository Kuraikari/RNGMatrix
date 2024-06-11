const SongGenerationModel = require("./SongGenerationModel");
const random = require("../app/server/utils/random");

/**
 * Model class for udio generations
 */
class SongModel {
    id = "0";
    name = "";
    description = "";
    fullLyrics = null;
    /**
     * @type {Array<SongGenerationModel>}
     */
    songGenerations = [];
    /** 
     * @type {SongModel}
     */
    parentSong = null;
    isChild = this.parentSong ? true : false;
    
    constructor() {
        this.name = random.getRandomString(10);
        this.id = this.returnId();
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

module.exports = SongModel;