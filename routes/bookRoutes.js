const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')

// Read
router.get('/', bookController.getAll)

// Create
router.get('/create', bookController.getCreate)
router.post('/create', bookController.postCreate)

// Edit
router.get('/edit/:id', bookController.getEdit)
router.post('/edit', bookController.postEdit)

// Delete
router.get('/delete/:id', bookController.deleteRecord)

module.exports = router



