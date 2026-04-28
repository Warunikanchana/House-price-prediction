const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/admin", adminRoutes);

app.use((error, _req, res, next) => {
  if (error?.type === "entity.too.large") {
    return res.status(413).json({
      message: "Image is too large. Please upload a smaller image.",
    });
  }

  if (error?.message === "Only image uploads are allowed.") {
    return res.status(400).json({
      message: error.message,
    });
  }

  return next(error);
});

module.exports = app;
