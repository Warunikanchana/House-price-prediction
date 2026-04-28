const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { predictPrice } = require("../controllers/predictionController");

const attachOptionalUser = (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (_error) {
      req.user = undefined;
    }
  }

  next();
};

router.post("/predict", attachOptionalUser, predictPrice);

module.exports = router;
