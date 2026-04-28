const axios = require("axios");

async function geocodePlace(placeName) {
  const query = `${placeName}, Sri Lanka`;

  const response = await axios.get("https://nominatim.openstreetmap.org/search", {
    params: {
      q: query,
      format: "json",
      limit: 1,
    },
    headers: {
      "User-Agent": "EstateMindStudentProject/1.0",
    },
  });

  if (!response.data || response.data.length === 0) {
    return null;
  }

  return {
    latitude: Number(response.data[0].lat),
    longitude: Number(response.data[0].lon),
  };
}

module.exports = geocodePlace;
