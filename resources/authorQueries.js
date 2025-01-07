const { query } = require("../config/db");

exports.getAllAuthors = async () => {
  try {
    const res = await query("SELECT * FROM author");
    // if (res.length === 0) return undefined;
    let dataArr = [];
    res.forEach((value) => {
      dataArr.push({
        id: value.author_id,
        authorName: value.name,
      });
    });
    return dataArr || null;
  } catch (err) {
    console.error("Error retrieving author data:", err);
    throw new Error("Failed to retrieve author data. Please try again later.");
  }
};

exports.getById = async (id) => {
  try {
    const res = await query("SELECT * FROM author WHERE author_id = ?", id);
    // if (res.length === 0) return undefined
    let dataArr = [];
    res.forEach((value) => {
      dataArr.push({
        id: value.author_id,
        authorName: value.name,
      });
    });
    return dataArr[0] || null;
  } catch (err) {
    console.error("Error retrieving author data:", err);
    throw new Error("Failed to retrieve author data. Please try again later.");
  }
};

exports.createAuthor = async (authorData) => {
  try {
    const res = await query(
      "INSERT INTO `author`(`name`) VALUES (?)",
      authorData
    );
    return res;
  } catch (err) {
    console.error("Error creating author:", err);
    throw new Error("Failed to create author. Please try again later.");
  }
};

exports.updateAuthor = async (authorData) => {
  try {
    const res = await query(
      "UPDATE `author` SET `name`= ? WHERE `author_id` = ?",
      authorData
    );
    return res;
  } catch (err) {
    console.error("Error updating author data:", err);
    throw new Error("Failed to update author data. Please try again later.");
  }
};

exports.deleteAuthor = async (id) => {
  try {
    const res = await query("DELETE FROM author WHERE author_id = ?", id);
    return res;
  } catch (err) {
    console.error("Error deleting author:", err);
    throw new Error("Failed to delete author. Please try again later.");
  }
};
