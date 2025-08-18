let log = console.log
const bookList = document.getElementById("bookList")
const newBookButton = document.getElementById("newBookButton")
const debugButton = document.getElementById("debugButton")

function Library(books) {
    this.books = books

    this.hasBook = function(bookId) {
        return this.books.find((book) => book.id == bookId)
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
        log("remove book fn")
        log({
            "bookIdToDelete" : bookIdToDelete
        })
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

function updateDisplayedBooks() {
    const shownBookList = document.getElementById("bookList")
    const shownBooks = shownBookList.getElementsByTagName("li")
    const shownBookIds = Array.from(shownBooks).map(li => li.getAttribute("id"))

    // ensure books that should not be shown are deleted
    for (let shownBookId of shownBookIds) {
        if (!myLibrary.hasBook(shownBookId)) {
            myLibrary.removeBook(shownBookId)
            document.getElementById(shownBookId).remove()
        }
    }

    //ensure books that should be shown are shown
    myLibrary.books.forEach( (book) => {
        if (shownBookIds.includes(book.id)) return

        const newLi = document.createElement("li")
        newLi.innerText = book.name
        newLi.setAttribute("id", book.id)

        const undoButton = document.createElement("button")
        undoButton.innerText = "Undo"
        undoButton.addEventListener("click", (e) => {
            e.preventDefault()
            myLibrary.removeBook(book.id)
            updateDisplayedBooks()
        })
        
        newLi.appendChild(undoButton)
        shownBookList.appendChild(newLi)
    })
}

newBookButton.addEventListener("click", (event) => {
    event.preventDefault()

    const form = document.getElementById("newBookForm")
    const formData = new FormData(form)
    const bookName = formData.get("bookName")
    newBookAdded = myLibrary.addNewBook(bookName)
    if (!newBookAdded) {
        alert("This book was already added!")
    }
    updateDisplayedBooks()
    form.reset()
})


debugButton.addEventListener("click", (event) => {
    event.preventDefault()
    log(myLibrary)
})

updateDisplayedBooks()

// log(myLibrary)
