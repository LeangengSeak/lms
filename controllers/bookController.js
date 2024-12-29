const con = require("../config/db");

// Get all books from the database and render the table view
// const getAllBooks = (req, res) => {
//     const sql = "SELECT * FROM book";
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.status(200).render("tbl_book", { books: result });
//     });
// };
const getAll = (req, res) => {
    const sql =
        "SELECT book.book_id AS id, book.name AS bookName, author.name AS authorName, category.name AS categoryName FROM book INNER JOIN author ON book.author_id = author.author_id INNER JOIN category ON book.category_id = category.category_id";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).render("book/tbl_book", { books: result });
    });
};

// Get a book by its ID and render the edit form
const getEdit = (req, res) => {
    const { id } = req.params;
    const sqlBook = "SELECT * FROM book WHERE book_id = ?";
    const sqlAuthor = "SELECT * FROM author";
    const sqlCategory = "SELECT * FROM category";
    con.query(sqlAuthor, (err, authorResult) => {
        if (err) throw err;
        con.query(sqlCategory, (err, categoryResult) => {
            if (err) throw err;
            con.query(sqlBook, id, (err, bookResult) => {
                if (err) throw err;
                console.log('Book found!')
                res.status(200).render("book/frmEditBook", { book: bookResult[0], authors: authorResult, categories: categoryResult });
            });
        });
    })

};

// Render the create book form
const getCreate = (req, res) => {
    const sqlAuthor = "SELECT * FROM author";
    const sqlCategory = "SELECT * FROM category";
    con.query(sqlAuthor, (err, authorResult) => {
        if (err) throw err;
        con.query(sqlCategory, (err, categoryResult) => {
            if (err) throw err;
            res.status(200).render("book/frmCreateBook", { authors: authorResult, categories: categoryResult });
        });
    })
};

// Create a new book and redirect to the books list
const postCreate = (req, res) => {
    const { bookName, author, category } = req.body;
    const arrBook = [bookName, author, category];
    console.log(req.body)
    const sql =
        "INSERT INTO `book`(`name`, `author_id`, `category_id`) VALUES (?,?,?)";
    con.query(sql, arrBook, (err, result) => {
        if (err) throw err;
        console.log("Book created!");
        res.redirect("/books");
    });
};

// Update an existing book and redirect to the books list
const postEdit = (req, res) => {
    const { bookId, bookName, author, category } = req.body;
    const sql =
        "UPDATE `book` SET `name`=?,`author_id`=?,`category_id`=? WHERE `book_id` = ?";
    const arrBook = [bookName, author, category, bookId];
    con.query(sql, arrBook, (err, result) => {
        if (err) throw err;
        console.log("Book updated!");
        res.redirect("/books");
    });
};

// Delete a book by its ID and redirect to the books list
const deleteRecord = (req, res) => {
    const sql = "DELETE FROM `book` WHERE `book_id` = ?";
    const { id } = req.params;
    con.query(sql, id, (err) => {
        if (err) throw err;
        console.log("Book deleted!");
        res.redirect("/books");
    });
};

module.exports = {
    getAll,
    getCreate,
    postCreate,
    getEdit,
    postEdit,
    deleteRecord,
};
