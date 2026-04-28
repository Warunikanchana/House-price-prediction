const pool = require("../config/db");

// Total counts
const getAdminSummary = async (req, res) => {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const admins = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'admin'");
    const sellers = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'seller'");
    const buyers = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'buyer'");
    const properties = await pool.query("SELECT COUNT(*) FROM properties");
    const predictions = await pool.query("SELECT COUNT(*) FROM predictions");
    const votes = await pool.query("SELECT COUNT(*) FROM votes");

    res.json({
      total_users: Number(users.rows[0].count),
      total_admins: Number(admins.rows[0].count),
      total_sellers: Number(sellers.rows[0].count),
      total_buyers: Number(buyers.rows[0].count),
      total_properties: Number(properties.rows[0].count),
      total_predictions: Number(predictions.rows[0].count),
      total_votes: Number(votes.rows[0].count),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Predictions per day
const getPredictionsPerDay = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        DATE(created_at) AS date,
        COUNT(*) AS prediction_count
      FROM predictions
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT 30
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Predictions per week
const getPredictionsPerWeek = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        DATE_TRUNC('week', created_at)::date AS week_start,
        COUNT(*) AS prediction_count
      FROM predictions
      GROUP BY DATE_TRUNC('week', created_at)
      ORDER BY week_start DESC
      LIMIT 12
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Predictions by district
const getPredictionsByDistrict = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        district,
        COUNT(*) AS prediction_count
      FROM predictions
      GROUP BY district
      ORDER BY prediction_count DESC
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Predictions by city
const getPredictionsByCity = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        city,
        COUNT(*) AS prediction_count
      FROM predictions
      GROUP BY city
      ORDER BY prediction_count DESC
      LIMIT 10
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Properties by district
const getPropertiesByDistrict = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        district,
        COUNT(*) AS property_count
      FROM properties
      GROUP BY district
      ORDER BY property_count DESC
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Most buyer searched areas = most prediction requests by city/district
const getMostSearchedAreas = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        district,
        city,
        COUNT(*) AS search_count
      FROM predictions
      GROUP BY district, city
      ORDER BY search_count DESC
      LIMIT 10
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdminSummary,
  getPredictionsPerDay,
  getPredictionsPerWeek,
  getPredictionsByDistrict,
  getPredictionsByCity,
  getPropertiesByDistrict,
  getMostSearchedAreas,
};
