const express = require('express')
const router = express.Router();

const categoryController = require('../controllers/categoryController')

// Read
router.get('/', categoryController.getAll)

// Create
router.get('/create', categoryController.getCreate)
router.post('/create', categoryController.postCreate)

// Edit
router.get('/edit/:id', categoryController.getEdit)
router.post('/edit', categoryController.postEdit)

// Delete
router.get('/delete/:id', categoryController.deleteRecord)

module.exports = router
