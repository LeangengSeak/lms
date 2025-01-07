const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const { requireAuth } = require("../middleware/authMiddleware");

// Read
router.get("/", requireAuth, categoryController.getAll);

// Create
router.get("/create", requireAuth, categoryController.getCreate);
router.post("/create", requireAuth, categoryController.postCreate);

// Edit
router.get("/edit/:id", requireAuth, categoryController.getEdit);
router.post("/edit", requireAuth, categoryController.postEdit);

// Delete
router.get("/delete/:id", requireAuth, categoryController.deleteRecord);

module.exports = router;
