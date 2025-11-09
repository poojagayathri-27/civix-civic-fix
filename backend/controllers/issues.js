const mongoose = require("mongoose");
const Issue = require("../models/issues");

// ✅ Create a new issue
exports.createIssue = async (req, res) => {
  try {
    const { title, description, phone, email, location } = req.body;

    if (!title || !description || !phone || !email || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let fileUrl = null;
    if (req.file) {
      fileUrl = req.file.filename; // multer saves locally in /uploads
    }

    const newIssue = new Issue({
      title,
      description,
      phone,
      email,
      location,
      fileUrl
    });

    await newIssue.save();
    res.status(201).json({
      message: "Issue created successfully",
      issue: newIssue
    });
  } catch (error) {
    console.error("Error creating issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get all issues
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get issue by ID
exports.getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.status(200).json(issue);
  } catch (error) {
    console.error("Error fetching issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Update issue status (admin)
exports.updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.status(200).json({ message: "Status updated successfully", issue });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Update issue (user edit)
exports.updateIssue = async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedIssue)
      return res.status(404).json({ message: "Issue not found" });
    res.status(200).json(updatedIssue);
  } catch (error) {
    console.error("Error updating issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Delete issue
exports.deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    console.error("Error deleting issue:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
