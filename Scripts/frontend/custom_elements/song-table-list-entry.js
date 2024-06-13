class SongTableListEntry extends HTMLElement {
    static observedAttributes = ["data"];

    constructor() {
        super();
    }

    connectedCallback() {
        const {id, name, songGenerations} = JSON.parse(this.getAttribute("data-song"));

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
        this.appendChild(entry);
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`);
    }
}

export default SongTableListEntry;