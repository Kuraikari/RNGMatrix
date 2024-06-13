class SongGenerationModel {
    id = 0;
    prompt = "";
    lyrics = null;
    advancedSettings = {
        seed: -1,
        promptStrength: 0.5,
        lyricsStrength: 0.5,
        clipStart: 0.4,
        contextWindow: 120,
        /**
         * @type {"Fastest" | "Fast" | "High" | "Ultra"}
         */
        quality: "High" ,
    }
}

export default SongGenerationModel;