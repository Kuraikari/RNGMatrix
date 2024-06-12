/**
 * @typedef SongModel
 * @property {string} id
 * @property {string} name
 * @property {Array<object>} songGenerations
 */

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

function createData() {

}

/**
 * 
 * @param {SongModel} data 
 */
function createSongListEntry(data) {
    const {id, name, songGenerations} = data;

    const entry = document.createElement("div");
    entry.id = id;
    entry.classList.add("entry-list-item")

    const fig = document.createElement("figure");
    const cnv = document.createElement("canvas");
    fig.appendChild(cnv);

    entry.appendChild(fig);

    const metaData = document.createElement("div");
    metaData.classList.add("entry-meta");
    
    const entryName = document.createElement("span");
    entryName.textContent = name;
    metaData.appendChild(entryName);

    entry.appendChild(metaData);

    const actionBar = document.createElement("div");
    actionBar.classList.add("action-bar");

    const editButton = document.createElement("button");
    editButton.classList.add("button", "button-edit");
    actionBar.appendChild(editButton);

    entry.appendChild(actionBar);
    return entry;
}

document.addEventListener("DOMContentLoaded", (e) => {
    const tbl = document.querySelector("#song-table .table-body");
    if (!!tbl) {
        fetchData()
            .then((data) => data.data)
            .then((saves) => {
                if (Array.isArray(saves)) {
                    saves.forEach((save) => {
                        console.debug(save);

                        const tblRow = document.createElement("div");
                        tblRow.classList.add("table-row");
                        
                        const tblItem = document.createElement("div");
                        tblItem.classList.add("table-row-item");                
                        tblItem.appendChild(createSongListEntry(save));
                        tblRow.appendChild(tblItem);
                        
                        tbl.appendChild(tblRow);

                        return tbl;
                    });
                }
            });
    }
});