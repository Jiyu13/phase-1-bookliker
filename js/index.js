document.addEventListener("DOMContentLoaded", (event) => {
    const listPanel = event.target.querySelector("#list-panel")
    const ul = event.target.querySelector("#list")
    const showPanel = event.target.querySelector("#show-panel")

    // show book details
    function showDetail(book) {
        const img = document.createElement("img")
        img.src = book["img_url"]

        const title = document.createElement("h1")
        title.textContent = book["title"]
        
        const subtitle = document.createElement("h2")
        subtitle.textContent = book["subtitle"]
        
        const author = document.createElement("h2")
        author.textContent = book["author"]

        const description = document.createElement("p")
        description.textContent = book["description"]

        
        const users = book["users"]
        const usersContainer = document.createElement("ul")
        users.forEach(user => {
            const eachUser = document.createElement("li")
            eachUser.textContent = user["username"]
            usersContainer.append(eachUser)
        })
        
        const likeBtn = event.target.createElement("button")
        likeBtn.innerHTML = "LIKE"
        likeBtn.addEventListener("click", () => {

            // show new username in DOM
            const newUser = {"id": 10, "username": "macejkovic"}
            const newli = document.createElement("li")


            if (likeBtn.innerHTML === "LIKE") {
                newli.textContent = newUser["username"]
                usersContainer.append(newli)
                
                likeBtn.innerHTML = "UNLIKE"

                users.push(newUser)
                fetch(`http://localhost:3000/books/${book.id}`, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        "users": users
                    })
                })
                .then(response => response.json())
                .then(newUser => console.log(newUser))
            
            } else if (likeBtn.innerHTML === "UNLIKE") {
                likeBtn.innerHTML = "LIKE"
                usersContainer.lastChild.remove()

                users.pop()
                
                fetch(`http://localhost:3000/books/${book.id}`, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        "users": users
                    })
                })
                .then(response => response.json())
                .then(book => console.log(book))
            }
        })

        showPanel.append(img, title, subtitle, author, description,  usersContainer, likeBtn)
        
    }


    // get all books
    function getBooks() {
        return fetch("http://localhost:3000/books")  // return fetch
        .then(response => response.json())
    }

    // render each book in li tag
    function renderBook(book) {
        const li = event.target.createElement("li")
        li.textContent = book["title"]
        li.addEventListener("click", () => {
            showPanel.innerHTML = ""  // clear book detail from las click
            showDetail(book)
        })
        ul.append(li)
    }

    getBooks().then(books => books.forEach(book => renderBook(book)))

});
