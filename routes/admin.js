const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Upload = require("../models/upload");

// Middleware to restrict access to admin users
const { restrictto } = require("../middleware/auth");

// Admin Dashboard Overview Route
router.get("/", restrictto(["admin"]), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalUploads = await Upload.countDocuments();
    const recentUploads = await Upload.find().sort({ timestamp: -1 }).limit(5).lean();
    res.render('admin',{totalusers:totalUsers,totaluploads:totalUploads,user:req.user});
  } catch (error) {
    console.error("Error fetching overview:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// View All Users
router.get("/users", restrictto(["admin"]), async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Manage User Roles
router.patch("/users/:id/role", restrictto(["admin"]), async (req, res) => {
  const { role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    res.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// View Upload History
router.get("/uploads", restrictto(["admin"]), async (req, res) => {
  try {
    const uploads = await Upload.find().populate("userId", "username email").lean();
    res.json({ success: true, data: uploads });
  } catch (error) {
    console.error("Error fetching uploads:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Delete Upload
router.delete("/uploads/:id", restrictto(["admin"]), async (req, res) => {
  try {
    await Upload.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Upload deleted" });
  } catch (error) {
    console.error("Error deleting upload:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
