/**
 * 
 * @param {SongModel} data Model for the song data
 * @returns {string} the response as a json string
 */
async function createData(data) {
    try {
        const resp = await fetch('http://localhost:3000/api/song', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const content = await resp.json();
        return content;
    } catch (e) {
        console.error(e);
    }
}

/**
 * Fetches data from the backend using the api for retrieving songs.
 * @returns {string} json of retrieved songs
 */
async function fetchData(id) {
    try {
        const re = await fetch(`http://localhost:3000/api/song/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/josn; charset=utf-8',
            },
            body: JSON.stringify({id})
        });
        return re.json();
    } catch (error) {
        console.error(error);
    }
}

export {
    fetchData,
    createData
}