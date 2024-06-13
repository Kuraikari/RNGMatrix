export default function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({"Styles": "css"});
    eleventyConfig.addPassthroughCopy({"Scripts": "js"});
};