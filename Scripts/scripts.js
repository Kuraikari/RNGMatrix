import SongModel from "./models/SongModel.js";

/**
 * 
 * @returns 
 */
async function fetchStatus() {
    try {
        const re = await fetch("http://localhost:3000/api/status");
        return re.json();
    } catch (error) {
        console.error(error);
    }
}

async function fetchData() {
    try {
        const re = await fetch("http://localhost:3000/api/songs");
        return re.json();
    } catch (error) {
        console.error(error);
    }
}

/**
 * 
 * @param {SongModel} data 
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

document.addEventListener("DOMContentLoaded", (e) => {
    const tbl = document.querySelector("#song-table .table-body");
    if (!!tbl) {
        fetchData()
            .then((data) => data.data)
            .then((/** * @type {Array<SongModel>}  */ saves) => {
                if (Array.isArray(saves)) {
                    saves.forEach((save) => {
                        console.debug(save);

                        const tblRow = document.createElement("div");
                        tblRow.classList.add("table-row");
                        
                        const tblItem = document.createElement("div");
                        tblItem.classList.add("table-row-item");
                        
                        const listElement = document.createElement("song-table-list-entry");
                        listElement.setAttribute("data-song", JSON.stringify(save));
                        listElement.finished = save

                        tblItem.appendChild(listElement);
                        tblRow.appendChild(tblItem);
                        
                        tbl.appendChild(tblRow);

                        return tbl;
                    });
                }
            });
    }
});