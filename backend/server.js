// =======================
// ✅ IMPORTS
// =======================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // ✅ Load environment variables
const issueRoutes = require("./routes/issues");

// =======================
// ✅ INITIALIZE APP
// =======================
const app = express();

// =======================
// ✅ CORS CONFIGURATION
// =======================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://civix-frontend.vercel.app", // ✅ your frontend deployment
      "https://civix-sqp4.onrender.com",   // ✅ backend live URL
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// =======================
// ✅ MIDDLEWARES
// =======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// ✅ ROUTES
// =======================
app.use("/api/issues", issueRoutes);

// Default route to test backend
app.get("/", (req, res) => {
  res.send("🚀 Civix backend is running successfully!");
});

// =======================
// ✅ DATABASE CONNECTION
// =======================
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ Error: MONGO_URI is missing in your .env file!");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected to civicfix database"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =======================
// ✅ START SERVER
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
