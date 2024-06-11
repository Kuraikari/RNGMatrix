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
        const re = await fetch("http://localhost:3000/api");
        return re.json();
    } catch (error) {
        console.error(error);
    }
}

function createData() {

}


document.addEventListener("DOMContentLoaded", (e) => {
    console.debug(fetchStatus());
});