const axios = require("axios");

const getPredictionFromFastAPI = async (payload) => {
  try {
    const response = await axios.post(
      process.env.FASTAPI_URL,
      {
        district: payload.district,
        city: payload.city,
        bedrooms: payload.bedrooms,
        bathrooms: payload.bathrooms,
        house_size: payload.house_size,
        land_size: payload.land_size,
      },
      {
        timeout: 10000,
      }
    );

    return response.data;
  } catch (error) {
    const serviceMessage =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message;

    console.error("FastAPI request failed:", serviceMessage);
    throw new Error(`Failed to get prediction from ML service: ${serviceMessage}`);
  }
};

module.exports = { getPredictionFromFastAPI };
