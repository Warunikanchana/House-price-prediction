const pool = require("../config/db");
const { getPredictionFromFastAPI } = require("../services/fastApiService");

const predictPrice = async (req, res) => {
  const {
    district,
    city,
    bedrooms,
    bathrooms,
    house_size,
    land_size,
    house_age,
    houseSize,
    landSize,
    houseAge,
  } = req.body;

  const normalizedPayload = {
    district,
    city,
    bedrooms: Number(bedrooms),
    bathrooms: Number(bathrooms),
    house_size: Number(house_size ?? houseSize),
    land_size: Number(land_size ?? landSize),
    house_age: Number(house_age ?? houseAge ?? 0),
  };

  if (
    !normalizedPayload.district ||
    !normalizedPayload.city ||
    !Number.isFinite(normalizedPayload.bedrooms) ||
    !Number.isFinite(normalizedPayload.bathrooms) ||
    !Number.isFinite(normalizedPayload.house_size) ||
    !Number.isFinite(normalizedPayload.land_size)
  ) {
    return res.status(400).json({
      message: "district, city, bedrooms, bathrooms, houseSize, and landSize are required.",
    });
  }

  try {
    const fastApiResult = await getPredictionFromFastAPI(normalizedPayload);

    const predictedPrice = fastApiResult.predicted_price;

    await pool.query(
      `
      INSERT INTO predictions
      (user_id, district, city, bedrooms, bathrooms, house_size, land_size, house_age, predicted_price)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        req.user?.id ?? null,
        normalizedPayload.district,
        normalizedPayload.city,
        normalizedPayload.bedrooms,
        normalizedPayload.bathrooms,
        normalizedPayload.house_size,
        normalizedPayload.land_size,
        normalizedPayload.house_age,
        predictedPrice,
      ]
    );

    res.json({
      message: "Prediction successful",
      predicted_price: predictedPrice,
      model_response: fastApiResult,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Prediction failed",
    });
  }
};

module.exports = { predictPrice };
