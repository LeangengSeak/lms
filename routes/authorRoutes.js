const express = require('express')
const router = express.Router();

const authorController = require('../controllers/authorcontroller')

// Read
router.get('/', authorController.getAll)

// Create
router.get('/create', authorController.getCreate)
router.post('/create', authorController.postCreate)

// Edit
router.get('/edit/:id', authorController.getEdit)
router.post('/edit', authorController.postEdit)

// Delete
router.get('/delete/:id', authorController.deleteRecord)
module.exports = router
