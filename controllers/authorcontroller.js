const con = require('../config/db')

const getAll = (req, res) => {
    const sql = "SELECT * FROM author";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).render('author/tbl_author', { authors: result })
    })
}

const getCreate = (req, res) => {
    res.status(200).render('author/frmCreateAuthor')
}

const postCreate = (req, res) => {
    const { authorName } = req.body;
    const arrAuthor = [authorName]
    const sql = "INSERT INTO `author`(`name`) VALUES (?)"
    con.query(sql, arrAuthor, (err, authorResult) => {
        if (err) throw err;
        console.log('Author created!')
        res.redirect('/authors')
    })
}

const getEdit = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM author WHERE author_id = ?";
    con.query(sql, id, (err, result) => {
        if (err) throw err;
        console.log('Author found!')
        res.status(200).render('author/frmEditAuthor', { author: result[0] })
    })
}

const postEdit = (req, res) => {
    const { authorName, authorId } = req.body;
    const arrAuthor = [authorName, authorId]
    const sql = "UPDATE `author` SET `name`= ? WHERE `author_id` = ?";
    con.query(sql, arrAuthor, (err, result) => {
        if (err) throw err;
        console.log('Author updated')
        res.redirect('/authors')
    })
}

const deleteRecord = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM author WHERE author_id = ?";
    con.query(sql, id, (err, result) => {
        if (err) throw err;
        console.log('Author deleted')
        res.redirect('/authors')
    })
}

module.exports = {
    getAll,
    getCreate,
    postCreate,
    getEdit,
    postEdit,
    deleteRecord
}