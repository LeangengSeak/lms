const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { requireAuth } = require("../middleware/authMiddleware");

// Read
router.get("/", requireAuth, bookController.getAll);

// Create
router.get("/create", requireAuth, bookController.getCreate);
router.post("/create", requireAuth, bookController.postCreate);

// Edit
router.get("/edit/:id", requireAuth, bookController.getEdit);
router.post("/edit", requireAuth, bookController.postEdit);

// Delete
router.get("/delete/:id", requireAuth, bookController.deleteRecord);

module.exports = router;
