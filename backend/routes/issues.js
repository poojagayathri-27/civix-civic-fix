const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issues");
const { upload } = require("../middlewares/multer.middleware");

// Routes
router.post("/", upload.single("file"), issueController.createIssue);
router.get("/", issueController.getAllIssues);
router.get("/:id", issueController.getIssueById);
router.patch("/:id/status", issueController.updateIssueStatus);
router.patch("/:id", issueController.updateIssue);
router.delete("/:id", issueController.deleteIssue);

module.exports = router;
