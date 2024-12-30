const categoryQuery = require('../resources/categoryQueries')

const getAll = async (req, res) => {
    try {
        const result = await categoryQuery.getAllCategories();
        res.status(200).render('category/tbl_category', { categories: result })
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
}

const getCreate = (req, res) => {
    res.status(200).render('category/frmCreatecategory')
}

const postCreate = async (req, res) => {
    const { categoryName } = req.body;
    const arrCategory = [categoryName]
    try {
        await categoryQuery.createCategory(arrCategory);
        console.log('Category created!')
        res.redirect('/categories')
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
}

const getEdit = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await categoryQuery.getById(id);
        res.status(200).render('category/frmEditcategory', { category: result })
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
}

const postEdit = async (req, res) => {
    const { categoryName, categoryId } = req.body;
    const arrCategory = [categoryName, categoryId]
    try {
        await categoryQuery.updateCategory(arrCategory);
        console.log('Category updated!')
        res.redirect('/categories')
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
}

const deleteRecord = async (req, res) => {
    const { id } = req.params;
    try {
        await categoryQuery.deleteCategory(id)
        console.log('Category deleted!')
        res.redirect('/categories')
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getAll,
    getCreate,
    postCreate,
    getEdit,
    postEdit,
    deleteRecord
}