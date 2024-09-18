import SongModel from "./SongModel";

class BestSongModel {
    /**
     * 
     * @param {Array<SongModel>?} songs 
     */
    constructor(songs) {
        /**
         * @type {Array<SongModel>}
         */
        this.bestSongs = songs ?? [];
        this.metadataForSongs = [];
        this.#getData();
    }

    async #getData() {
        const s = Promise.all(this.bestSongs.map(async (x) => {
            const data = await fetch(`https://localhost:3000/song/${x.id}`);
            return data;
        }));

        this.metadataForSongs = s;
    }
}

export default BestSongModel;