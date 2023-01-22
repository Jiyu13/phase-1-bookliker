document.addEventListener("DOMContentLoaded", (event) => {
    const listPanel = event.target.querySelector("#list-panel")
    const ul = event.target.querySelector("#list")


    function getBooks() {
        return fetch("http://localhost:3000/books")  // return fetch
        .then(response => response.json())
    }

    function renderBook(book) {
        const li = event.target.createElement("li")
        console.log(li)
        li.textContent = book["title"]
        ul.append(li)
    }

    getBooks().then(books => books.forEach(book => renderBook(book)))

});
