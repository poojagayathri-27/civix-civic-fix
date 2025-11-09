const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const issueRoutes = require("./routes/issues");

const app = express();

// ✅ CORS — allow frontend on localhost:3000
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// ✅ Middleware for JSON + form handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static uploads (if any files are stored locally)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API routes
app.use("/api/issues", issueRoutes);

// ✅ Default route to confirm backend is running
app.get("/", (req, res) => {
  res.send("Civix backend is running 🚀");
});

// ✅ MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/civicfix")
  .then(() => {
    console.log("✅ MongoDB connected to civicfix database");
    console.log("Database Name:", mongoose.connection.name);
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
