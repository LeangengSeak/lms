const con = require('../config/db')

const getAll = (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).render('category/tbl_category', { categories: result })
    })
}

const getCreate = (req, res) => {
    res.status(200).render('category/frmCreatecategory')
}

const postCreate = (req, res) => {
    const { categoryName } = req.body;
    const arrCategory = [categoryName]
    const sql = "INSERT INTO `category`(`name`) VALUES (?)"
    con.query(sql, arrCategory, (err, categoryResult) => {
        if (err) throw err;
        console.log('Category created!')
        res.redirect('/categories')
    })
}

const getEdit = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM category WHERE category_id = ?";
    con.query(sql, id, (err, result) => {
        if (err) throw err;
        console.log('Category found!')
        res.status(200).render('category/frmEditcategory', { category: result[0] })
    })
}

const postEdit = (req, res) => {
    const { categoryName, categoryId } = req.body;
    const arrCategory = [categoryName, categoryId]
    const sql = "UPDATE `category` SET `name`= ? WHERE `category_id` = ?";
    con.query(sql, arrCategory, (err, result) => {
        if (err) throw err;
        console.log('Category updated!')
        res.redirect('/categories')
    })
}

const deleteRecord = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM category WHERE category_id = ?";
    con.query(sql, id, (err, result) => {
        if (err) throw err;
        console.log('Category deleted!')
        res.redirect('/categories')
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