const { query } = require('../config/db')

exports.getAllAuthors = async () => {
    try {
        const res = await query("SELECT * FROM author");
        return res;
    } catch (err) {
        throw err
    }
}

exports.getById = async (id) => {
    try {
        const res = await query("SELECT * FROM author WHERE author_id = ?", id)
        return res[0]
    } catch (err) {
        throw err
    }
}

exports.createAuthor = async (authorData) => {
    try {
        const res = await query("INSERT INTO `author`(`name`) VALUES (?)", authorData)
        return res
    } catch (err) {
        throw err
    }
}

exports.updateAuthor = async (authorData) => {
    try {
        const res = await query("UPDATE `author` SET `name`= ? WHERE `author_id` = ?", authorData)
        return res
    } catch (err) {
        throw err
    }
}

exports.deleteAuthor = async (id) => {
    try {
        const res = await query("DELETE FROM author WHERE author_id = ?", id)
        return res
    } catch (err) {
        throw err
    }
}