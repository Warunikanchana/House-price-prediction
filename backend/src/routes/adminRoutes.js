const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAdminSummary,
  getPredictionsPerDay,
  getPredictionsPerWeek,
  getPredictionsByDistrict,
  getPredictionsByCity,
  getPropertiesByDistrict,
  getMostSearchedAreas,
} = require("../controllers/adminController");

router.get("/summary", authMiddleware, adminMiddleware, getAdminSummary);
router.get("/predictions/day", authMiddleware, adminMiddleware, getPredictionsPerDay);
router.get("/predictions/week", authMiddleware, adminMiddleware, getPredictionsPerWeek);
router.get("/predictions/district", authMiddleware, adminMiddleware, getPredictionsByDistrict);
router.get("/predictions/city", authMiddleware, adminMiddleware, getPredictionsByCity);
router.get("/properties/district", authMiddleware, adminMiddleware, getPropertiesByDistrict);
router.get("/most-searched-areas", authMiddleware, adminMiddleware, getMostSearchedAreas);

module.exports = router;