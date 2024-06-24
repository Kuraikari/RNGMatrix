/**
 * 
 * @param {number} numChars 
 * @param {{usePnct: boolean, useSpecial: boolean, useRandAll: boolean}} settings 
 * @returns 
 */
function generateRandomInstrumentalString(numChars, settings) {
    function getRandomInt(min, max) {
        return Number.parseInt(Math.round(Math.random() * (max - min) + min));
    }

    /**
     * 
     * @param {Array<any>} arr 
     */
    function shuffle(arr) {
        let currIndex = arr.length;

        while (currIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currIndex);
            currIndex--;

            [arr[currIndex], arr[randomIndex]] = [arr[randomIndex], arr[currIndex]];
        }
    }

    var str = "";
    const listOfChars = [];

    if (settings.usePnct) {
        listOfChars.push(33);
        listOfChars.push(44);
        listOfChars.push(45);
        listOfChars.push(46);
        listOfChars.push(58);
        listOfChars.push(59);
        listOfChars.push(63);
    }

    if (settings.useSpecial) {
        listOfChars.push(34);
        listOfChars.push(35);
        listOfChars.push(36);
        listOfChars.push(37);
        listOfChars.push(38);
        listOfChars.push(39);
        listOfChars.push(42);
        listOfChars.push(43);
        listOfChars.push(47);
        listOfChars.push(60);
        listOfChars.push(61);
        listOfChars.push(62);
    }

    for (let i = 0; i < numChars; i++) {
        shuffle(listOfChars);
        str += String.fromCharCode(listOfChars.at(getRandomInt(0, listOfChars.length - 1)));
    }
    
    return str;
}

document.addEventListener("DOMContentLoaded", (e) => {
    const gem = generateRandomInstrumentalString(10, {
        usePnct: true,
        useSpecial: true 
    });

    console.debug(gem);
});