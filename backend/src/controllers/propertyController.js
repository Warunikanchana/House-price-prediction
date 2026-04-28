const pool = require("../config/db");
const geocodePlace = require("../utils/geocodePlace");

const propertySelectQuery = `
  SELECT
    p.id,
    p.title,
    p.description,
    p.district,
    p.city,
    p.price,
    p.bedrooms,
    p.bathrooms,
    p.house_size,
    p.land_size,
    p.house_age,
    p.latitude,
    p.longitude,
    p.image_url,
    p.created_at,
    u.name AS seller_name,
    COALESCE(
      ARRAY_AGG(pi.image_url ORDER BY pi.id) FILTER (WHERE pi.image_url IS NOT NULL),
      '{}'
    ) AS image_urls
  FROM properties p
  JOIN users u ON p.seller_id = u.id
  LEFT JOIN property_images pi ON pi.property_id = p.id
`;

const propertyGroupBy = `
  GROUP BY
    p.id,
    p.title,
    p.description,
    p.district,
    p.city,
    p.price,
    p.bedrooms,
    p.bathrooms,
    p.house_size,
    p.land_size,
    p.house_age,
    p.latitude,
    p.longitude,
    p.image_url,
    p.created_at,
    u.name
`;

const NEARBY_DISTANCE_KM = 12;

function calculateDistanceInKm(latitudeA, longitudeA, latitudeB, longitudeB) {
  const toRadians = (value) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const latitudeDiff = toRadians(latitudeB - latitudeA);
  const longitudeDiff = toRadians(longitudeB - longitudeA);
  const startLatitude = toRadians(latitudeA);
  const endLatitude = toRadians(latitudeB);

  const haversineValue = (
    Math.sin(latitudeDiff / 2) ** 2
    + Math.cos(startLatitude) * Math.cos(endLatitude) * Math.sin(longitudeDiff / 2) ** 2
  );

  const angularDistance = 2 * Math.atan2(Math.sqrt(haversineValue), Math.sqrt(1 - haversineValue));

  return earthRadiusKm * angularDistance;
}

const getAllProperties = async (req, res) => {
  const district = req.query.district?.trim();
  const city = req.query.city?.trim();
  const nearPlace = req.query.nearPlace?.trim();

  try {
    const queryValues = [];
    const whereClauses = [];

    if (district) {
      queryValues.push(`%${district}%`);
      whereClauses.push(`p.district ILIKE $${queryValues.length}`);
    }

    if (city) {
      queryValues.push(`%${city}%`);
      whereClauses.push(`p.city ILIKE $${queryValues.length}`);
    }

    const result = await pool.query(
      `
      ${propertySelectQuery}
      ${whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : ""}
      ${propertyGroupBy}
      ORDER BY p.created_at DESC
      `,
      queryValues,
    );

    let rows = result.rows;

    if (nearPlace) {
      const placeCoordinates = await geocodePlace(nearPlace);

      if (!placeCoordinates) {
        return res.status(404).json({ message: "Nearby place not found in Sri Lanka." });
      }

      rows = rows
        .map((property) => {
          if (property.latitude === null || property.longitude === null) {
            return null;
          }

          const distanceKm = calculateDistanceInKm(
            Number(property.latitude),
            Number(property.longitude),
            placeCoordinates.latitude,
            placeCoordinates.longitude,
          );

          if (distanceKm > NEARBY_DISTANCE_KM) {
            return null;
          }

          return {
            ...property,
            distance_km: Number(distanceKm.toFixed(2)),
          };
        })
        .filter(Boolean)
        .sort((propertyA, propertyB) => propertyA.distance_km - propertyB.distance_km);
    }

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      ${propertySelectQuery}
      WHERE p.id = $1
      ${propertyGroupBy}
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProperty = async (req, res) => {
  const sellerId = req.user.id;
  const {
    title,
    description,
    district,
    city,
    price,
    bedrooms,
    bathrooms,
    house_size,
    land_size,
    house_age,
    latitude,
    longitude,
  } = req.body;

  const uploadedImageUrls = (req.files ?? []).map(
    (file) => `/uploads/properties/${file.filename}`
  );

  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can create properties" });
    }

    const result = await pool.query(
      `
      INSERT INTO properties
      (
        seller_id,
        title,
        description,
        district,
        city,
        price,
        bedrooms,
        bathrooms,
        house_size,
        land_size,
        house_age,
        latitude,
        longitude,
        image_url
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id
      `,
      [
        sellerId,
        title,
        description,
        district,
        city,
        price,
        bedrooms,
        bathrooms,
        house_size,
        land_size,
        house_age,
        latitude,
        longitude,
        uploadedImageUrls[0] ?? null,
      ]
    );

    const propertyId = result.rows[0].id;

    for (const imageUrl of uploadedImageUrls) {
      await pool.query(
        `
        INSERT INTO property_images (property_id, image_url)
        VALUES ($1, $2)
        `,
        [propertyId, imageUrl]
      );
    }

    const createdProperty = await pool.query(
      `
      ${propertySelectQuery}
      WHERE p.id = $1
      ${propertyGroupBy}
      `,
      [propertyId]
    );

    res.status(201).json({
      message: "Property created successfully",
      property: createdProperty.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSellerProperties = async (req, res) => {
  const sellerId = req.user.id;

  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can view seller listings" });
    }

    const result = await pool.query(
      `
      ${propertySelectQuery}
      WHERE p.seller_id = $1
      ${propertyGroupBy}
      ORDER BY p.created_at DESC
      `,
      [sellerId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePropertyPrice = async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  const sellerId = req.user.id;

  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can update property price" });
    }

    const result = await pool.query(
      `
      UPDATE properties
      SET price = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2 AND seller_id = $3
      RETURNING id
      `,
      [price, id, sellerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Property not found or unauthorized" });
    }

    const updatedProperty = await pool.query(
      `
      ${propertySelectQuery}
      WHERE p.id = $1
      ${propertyGroupBy}
      `,
      [result.rows[0].id]
    );

    res.json({
      message: "Property price updated successfully",
      property: updatedProperty.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  const sellerId = req.user.id;

  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can delete properties" });
    }

    const result = await pool.query(
      `
      DELETE FROM properties
      WHERE id = $1 AND seller_id = $2
      RETURNING id
      `,
      [id, sellerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Property not found or unauthorized" });
    }

    res.json({
      message: "Property deleted successfully",
      propertyId: Number(id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  getSellerProperties,
  updatePropertyPrice,
  deleteProperty,
};
