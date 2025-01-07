const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorcontroller");
const { requireAuth } = require("../middleware/authMiddleware");

// Read
router.get("/", requireAuth, authorController.getAll);

// Create
router.get("/create", requireAuth, authorController.getCreate);
router.post("/create", requireAuth, authorController.postCreate);

// Edit
router.get("/edit/:id", requireAuth, authorController.getEdit);
router.post("/edit", requireAuth, authorController.postEdit);

// Delete
router.get("/delete/:id", requireAuth, authorController.deleteRecord);
module.exports = router;
