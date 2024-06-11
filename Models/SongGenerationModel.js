class SongGenerationModel {
    Id = 0;
    Prompt = "";
    Lyrics = null;
    AdvancedSettings = {
        Seed: -1,
        PromptStrength: 0.5,
        LyricsStrength: 0.5,
        ClipStart: 0.4,
        ContextWindow: 120,
        /**
         * @type {"Fastest" | "Fast" | "High" | "Ultra"}
         */
        Quality: "High" ,
    }
}

module.exports = SongGenerationModel;