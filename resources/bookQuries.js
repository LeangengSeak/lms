const { query } = require('../config/db')

exports.getAllBooks = async () => {
    try {
        const res = await query("SELECT book.book_id AS id, book.name AS bookName, author.name AS authorName, category.name AS categoryName FROM book INNER JOIN author ON book.author_id = author.author_id INNER JOIN category ON book.category_id = category.category_id");
        return res;
    } catch (err) {
        throw err
    }
}

exports.getById = async (id) => {
    try {
        const res = await query("SELECT * FROM book WHERE book_id = ?", id)
        return res[0]
    } catch (err) {
        throw err
    }
}

exports.createBook = async (bookData) => {
    try {
        const res = await query("INSERT INTO `book`(`name`, `author_id`, `category_id`) VALUES (?,?,?)", bookData)
        return res
    } catch (err) {
        throw err
    }
}

exports.updateBook = async (bookData) => {
    try {
        const res = await query("UPDATE `book` SET `name`=?,`author_id`=?,`category_id`=? WHERE `book_id` = ?", bookData)
        return res
    } catch (err) {
        throw err
    }
}

exports.deleteBook = async (id) => {
    try {
        const res = await query("DELETE FROM `book` WHERE `book_id` = ?", id)
        return res
    } catch (err) {
        throw err
    }
}