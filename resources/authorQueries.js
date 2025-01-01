const { query } = require('../config/db')

exports.getAllAuthors = async () => {
    try {
        const res = await query("SELECT * FROM author");
        // if (res.length === 0) return undefined;
        let dataArr = [];
        res.forEach(value => {
            dataArr.push({
                id: value.author_id,
                authorName: value.name
            })
        })
        return dataArr;
    } catch (err) {
        throw err
    }
}

exports.getById = async (id) => {
    try {
        const res = await query("SELECT * FROM author WHERE author_id = ?", id)
        // if (res.length === 0) return undefined
        let dataArr = []
        res.forEach(value => {
            dataArr.push({
                id: value.author_id,
                authorName: value.name
            })
        })
        return dataArr[0];
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