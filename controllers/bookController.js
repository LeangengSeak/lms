const bookQuery = require('../resources/bookQuries')
const categoryQuery = require('../resources/categoryQueries');
const authorQuery = require('../resources/authorQueries');

const getAll = async (req, res) => {
    try {
        const result = await bookQuery.getAllBooks();
        res.status(200).render("book/tbl_book", { books: result });
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
};

// Get a book by its ID and render the edit form
const getEdit = async (req, res) => {
    const { id } = req.params;
    try {
        const bookResult = await bookQuery.getById(id);
        const authorResult = await authorQuery.getAllAuthors();
        const categoryResult = await categoryQuery.getAllCategories();
        res.status(200).render("book/frmEditBook", { book: bookResult, authors: authorResult, categories: categoryResult });
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
};

// Render the create book form
const getCreate = async (req, res) => {
    try {
        const authorResult = await authorQuery.getAllAuthors();
        const categoryResult = await categoryQuery.getAllCategories();
        res.status(200).render("book/frmCreateBook", { authors: authorResult, categories: categoryResult });
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
};

// Create a new book and redirect to the books list
const postCreate = async (req, res) => {
    const { bookName, author, category } = req.body;
    const arrBook = [bookName, author, category];
    try {
        await bookQuery.createBook(arrBook);
        console.log("Book created!");
        res.redirect("/books");
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
};

// Update an existing book and redirect to the books list
const postEdit = async (req, res) => {
    const { bookId, bookName, author, category } = req.body;
    const arrBook = [bookName, author, category, bookId];
    try {
        await bookQuery.updateBook(arrBook)
        console.log("Book updated!");
        res.redirect("/books");
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
};

// Delete a book by its ID and redirect to the books list
const deleteRecord = async (req, res) => {
    const { id } = req.params;
    try {
        await bookQuery.deleteBook(id);
        console.log("Book deleted!");
        res.redirect("/books");
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
};

module.exports = {
    getAll,
    getCreate,
    postCreate,
    getEdit,
    postEdit,
    deleteRecord,
};
