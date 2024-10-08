/**
 * Fetches the current status of the backend
 * @returns json of retrieved status message
 */
async function fetchStatus() {
    try {
        const re = await fetch("http://localhost:3000/api/status");
        return re.json();
    } catch (error) {
        console.error(error);
    }
}


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
 */
async function fetchData(id) {
    try {

        if (!id) {
            const re = await fetch(`http://localhost:3000/api/songs/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            });
            return re.json();
        } else {
            const re = await fetch(`http://localhost:3000/api/song/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({id})
            });
            return re.json();
        }
    } catch (error) {
        console.error(error);
    }
}

async function deleteData(id) {
    try {
        if (!id) throw new Error("Missing ID!");
        const re = await fetch(`http://localhost:3000/api/song/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        return re.json();
    } catch(e) {
        console.error(e);
        return null;
    }
}

async function fetchSongMetadata(id, url) {
    try {
        if (!id) throw new Error("Missing ID!");
        const re = await fetch(`http://localhost:3000/api/song/${id}/song-url`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: {
                url
            }
        });
        return re.json();
    } catch (err) {

    }
}

export {
    fetchStatus,
    fetchData,
    createData,
    deleteData,
    fetchSongMetadata
}