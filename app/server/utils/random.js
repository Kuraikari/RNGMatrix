function getRandomInt(min, max) {
    return Number.parseInt(Math.round(Math.random() * (max - min) + min));
}

function getChar(int) {
    return String.fromCharCode(int);
}

function getRandomString(len) {
    const result = new Array(len).fill(0)
        .map((v, i) => i === 0 ? getRandomInt(65, 90) : getRandomInt(97, 122))
        .map((v) => getChar(v))
        .join("");
    
    return result;
}

module.exports = {
    getRandomString,
    getChar,
    getRandomInt
}