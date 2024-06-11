function fetchData() {
    fetch("http://localhost:3000")
        .then(data => {
            console.debug(data);
            return data;
        })
        .catch(reason => console.error(reason));
}

function createData() {

}
