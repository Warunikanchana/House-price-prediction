const express = require("express");
const router = express.Router();

const {
  getAllProperties,
  getPropertyById,
  createProperty,
  getSellerProperties,
  updatePropertyPrice,
  deleteProperty,
} = require("../controllers/propertyController");

const authMiddleware = require("../middleware/authMiddleware");
const uploadPropertyImages = require("../middleware/uploadMiddleware");

// Public routes
router.get("/", getAllProperties);

// Seller protected routes
router.post("/", authMiddleware, uploadPropertyImages.array("images", 10), createProperty);
router.get("/seller/my-listings", authMiddleware, getSellerProperties);
router.put("/:id/price", authMiddleware, updatePropertyPrice);
router.delete("/:id", authMiddleware, deleteProperty);
router.get("/:id", getPropertyById);

module.exports = router;
