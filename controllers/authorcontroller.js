const authorQuery = require('../resources/authorQueries');
const vAuthor = require('../validation/authorValidation');

const getAll = async (req, res) => {
    try {
        const result = await authorQuery.getAllAuthors();
        res.status(200).render('author/tbl_author', { authors: result });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const getCreate = (req, res) => {
    res.status(200).render('author/frmCreateAuthor');
};

const postCreate = async (req, res) => {
    const { error, value } = vAuthor(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
    const { authorName } = value;
    const arrAuthor = [authorName];
    try {
        await authorQuery.createAuthor(arrAuthor);
        console.log('Author created!');
        res.redirect('/authors');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const getEdit = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await authorQuery.getById(id);
        res.status(200).render('author/frmEditAuthor', { author: result });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const postEdit = async (req, res) => {
    const { error, value } = vAuthor(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
    const { authorName, authorId } = value;
    const arrAuthor = [authorName, authorId];
    try {
        await authorQuery.updateAuthor(arrAuthor);
        console.log('Author updated!');
        res.redirect('/authors');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const deleteRecord = async (req, res) => {
    const { id } = req.params;
    try {
        await authorQuery.deleteAuthor(id);
        console.log('Author deleted!');
        res.redirect('/authors');
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
    deleteRecord
};