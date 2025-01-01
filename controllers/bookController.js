const bookQuery = require('../resources/bookQuries');
const categoryQuery = require('../resources/categoryQueries');
const authorQuery = require('../resources/authorQueries');
const fs = require('fs');
const vBook = require('../validation/bookValidation');

const DEFAULT_COVER = "default-cover.jpg";

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
    const { error, value } = vBook(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
    const { bookName, author, category } = value;
    let sampleFile, sampleFileName, uploadPath;
    if (req.files) {
        sampleFile = req.files.bookCover;
        sampleFileName = Date.now() + sampleFile.name;
        uploadPath = "./public/upload/" + sampleFileName;
        sampleFile.mv(uploadPath, err => {
            if (err) throw err;
            console.log('successfully uploaded');
        });
    } else {
        sampleFileName = DEFAULT_COVER;
    }

    const arrBook = [bookName, sampleFileName, author, category];
    try {
        await bookQuery.createBook(arrBook);
        console.log("Book created!");
        res.redirect("/books");
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

// Update an existing book and redirect to the books list
const postEdit = async (req, res) => {
    console.log(req.files);
    console.log(req.body);
    const { error, value } = vBook(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
    const { bookId, bookName, author, category } = value;
    let file;
    if (!req.files) {
        file = req.body.oldCover;
    } else {
        const sampleFile = req.files.bookCover;
        const sampleFileName = Date.now() + sampleFile.name;
        const uploadPath = "./public/upload/" + sampleFileName;
        sampleFile.mv(uploadPath, err => {
            if (err) throw err;
            console.log('successfully uploaded');
            if (req.body.oldCover !== DEFAULT_COVER) {
                fs.unlinkSync('public/upload/' + req.body.oldCover);
            }
        });
        file = sampleFileName;
    }
    const arrBook = [bookName, file, author, category, bookId];
    try {
        await bookQuery.updateBook(arrBook);
        console.log("Book updated!");
        res.redirect("/books");
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

// Delete a book by its ID and redirect to the books list
const deleteRecord = async (req, res) => {
    const { id } = req.params;
    try {
        const bookResult = await bookQuery.getById(id);
        if (bookResult.bookCover !== DEFAULT_COVER) {
            fs.unlinkSync('public/upload/' + bookResult.bookCover);
        }
        await bookQuery.deleteBook(id);
        console.log("Book deleted!");
        res.redirect("/books");
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
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
