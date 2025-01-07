const { query } = require("../config/db");

exports.getAllBooks = async () => {
  try {
    const res = await query(
      "SELECT book.book_id AS id, book.name AS bookName, book.bookCover, author.name AS authorName, category.name AS categoryName FROM book INNER JOIN author ON book.author_id = author.author_id INNER JOIN category ON book.category_id = category.category_id"
    );
    // if (res.length === 0) throw new Error("No book found");
    let dataArr = [];
    res.forEach((value) => {
      dataArr.push({
        id: value.id,
        bookName: value.bookName,
        bookCover: value.bookCover,
        authorName: value.authorName,
        categoryName: value.categoryName,
      });
    });
    return dataArr || null;
  } catch (err) {
    console.error("Error retireving book data:", err);
    throw new Error("Failed to retrieve book data. Please try again later.");
  }
};

exports.getById = async (id) => {
  try {
    const res = await query("SELECT * FROM book WHERE book_id = ?", id);
    let dataArr = [];
    res.forEach((value) => {
      dataArr.push({
        id: value.book_id,
        bookName: value.name,
        bookCover: value.bookCover,
        authorId: value.author_id,
        categoryId: value.category_id,
      });
    });
    return dataArr[0] || null;
  } catch (err) {
    console.error("Error retrieving book data:", err);
    throw new Error("Failed to retrieve book data. Please try again later.");
  }
};

exports.createBook = async (bookData) => {
  try {
    const res = await query(
      "INSERT INTO `book`(`name`, `bookCover`, `author_id`, `category_id`) VALUES (?,?,?,?)",
      bookData
    );
    return res;
  } catch (err) {
    console.error("Error creating book:", err);
    throw new Error("Failed to create book. Please try again later.");
  }
};

exports.updateBook = async (bookData) => {
  try {
    const res = await query(
      "UPDATE `book` SET `name`=?, `bookCover`=?, `author_id`=?,`category_id`=? WHERE `book_id` = ?",
      bookData
    );
    return res;
  } catch (err) {
    console.error("Error updating book data:", err);
    throw new Error("Failed to update book data. Please try again later.");
  }
};

exports.deleteBook = async (id) => {
  try {
    const res = await query("DELETE FROM `book` WHERE `book_id` = ?", id);
    return res;
  } catch (err) {
    console.error("Error deleting book:", err);
    throw new Error("Failed to delete book. Please try again later.");
  }
};
