let log = console.log
const bookList = document.getElementById("bookList")
const newBookButton = document.getElementById("newBookButton")
const submitNewBookButton = document.getElementById("submitNewBookButton")
const debugButton = document.getElementById("debugButton")
const dialog = document.getElementById("newBookDialog")
const form = document.getElementById("newBookForm")

function Library(books) {
    this.books = books

    this.hasBook = function(bookId) {
        return this.books.find((book) => book.id === bookId)
    }

    this.flipBookReadStatus = function(bookIdToUpdate) {
        let book = this.books.find((book) => book.id === bookIdToUpdate)
        book.isRead = !(book.isRead)
    }

    this.addNewBook = function(newBookName) {
        let currentBookNames = this.books.map(book => book.name)
        let duplicate = currentBookNames.includes(newBookName) 
        if (duplicate) {
            return false
        }

        let newBook = new Book(newBookName)
        this.books.push(newBook)
        return true
    }

    this.removeBook = function(bookIdToDelete) {
        this.books = this.books.filter(book => book.id != bookIdToDelete)
    }
}

function Book(name) {
    this.id = crypto.randomUUID()
    this.name = name
}

const myLibrary = new Library(
    [
        new Book("Harry Potter"),
        new Book("Lord of the rings")
    ]
)

// function updateDisplayedBooks() {
//     const shownBookList = document.getElementById("bookList")
//     const shownBooks = shownBookList.getElementsByTagName("li")
//     const shownBookIds = Array.from(shownBooks).map(li => li.getAttribute("id"))

//     // ensure books that should not be shown are deleted
//     for (let shownBookId of shownBookIds) {
//         if (!myLibrary.hasBook(shownBookId)) {
//             document.getElementById(shownBookId).remove()
//         }
//     }

//     //ensure books that should be shown are shown
//     myLibrary.books.forEach( (book) => {
//         if (shownBookIds.includes(book.id)) return

//         const newLi = document.createElement("li")
//         newLi.innerText = book.name
//         newLi.setAttribute("id", book.id)

//         const readButton = document.createElement("button")
//         readButton.innerText = "Read"
//         readButton.addEventListener("click" (e) => {
//             e.preventDefault()
//             myLibrary
//         })

//         const undoButton = document.createElement("button")
//         undoButton.innerText = "Undo"
//         undoButton.addEventListener("click", (e) => {
//             e.preventDefault()
//             myLibrary.removeBook(book.id)
//             updateDisplayedBooks()
//         })
        
//         newLi.appendChild(undoButton)
//         shownBookList.appendChild(newLi)
//     })
// }
function updateShownBookList() {
    const shownBookList = document.getElementById("bookList")

    // clear any current items
    shownBookList.innerHTML = ""

    // Rerender library books
    for (let book of myLibrary.books) {
    
        const newLi = document.createElement("li")
        newLi.setAttribute("id", book.id)
        newLi.className = "bookItem"

        const bookText = document.createElement("p")
        bookText.innerText = `${book.name}`
        newLi.appendChild(bookText)
    
        const btnDiv = document.createElement("div")
        btnDiv.className = "bookActions"
        const readButton = document.createElement("button")
        readButton.innerText = book.isRead ? "Read" : "Unread"
        readButton.className = book.isRead ? "read" : "unread"
        readButton.addEventListener("click", (e) => {
            e.preventDefault()
            myLibrary.flipBookReadStatus(book.id)
            updateShownBookList()
        })
        btnDiv.appendChild(readButton)

        const removeButton = document.createElement("button")
        removeButton.innerText = "Remove"
        removeButton.addEventListener("click", (e) => {
            e.preventDefault()
            myLibrary.removeBook(book.id)
            updateShownBookList()
        })
        
        btnDiv.appendChild(removeButton)

        newLi.appendChild(btnDiv)

        shownBookList.appendChild(newLi)
    }
}

newBookButton.addEventListener("click", (event) => {
    event.preventDefault()
    log("test")
    dialog.showModal()
})


// submitNewBookButton.addEventListener("click", (event) => {
//     event.preventDefault()

//     const form = document.getElementById("newBookForm")
//     const formData = new FormData(form)
//     const bookName = formData.get("bookName")
//     let newBookAdded = myLibrary.addNewBook(bookName)
//     if (!newBookAdded) {
//         alert("This book was already added!")
//     }
//     updateShownBookList()
//     // form.reset()
//     dialog.close()
// })
form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const bookName = formData.get("bookName")
    let newBookAdded = myLibrary.addNewBook(bookName)
    if (!newBookAdded) {
        alert("This book was already added!")
    }
    updateShownBookList()
    // form.reset()
    dialog.close()
})


debugButton.addEventListener("click", (event) => {
    event.preventDefault()
    log(myLibrary)
})

updateShownBookList()

// log(myLibrary)
