import SongGenerationModel from "./SongGenerationModel";

/**
 * Model class for udio generations
 */
class SongModel {
    Id = 0;
    Name = "";
    Description = "";
    FullLyrics = null;
    /**
     * @type {Array<SongGenerationModel>}
     */
    SongGenerations = [];
}

export default SongModel;