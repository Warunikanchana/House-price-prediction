import axios from 'axios';
import { initialProperties } from '../data/properties';

const marketplaceApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api',
});

const assetBaseUrl = marketplaceApi.defaults.baseURL.replace(/\/api$/, '');

function resolveImageUrl(imageUrl) {
  if (!imageUrl) {
    return imageUrl;
  }

  if (/^(https?:|data:|blob:)/.test(imageUrl) || imageUrl.startsWith('/assets/')) {
    return imageUrl;
  }

  return `${assetBaseUrl}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
}

marketplaceApi.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('authToken');

  if (token && token !== 'undefined' && token !== 'null') {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

marketplaceApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.localStorage.removeItem('authToken');
      window.localStorage.removeItem('currentUser');
    }

    return Promise.reject(error);
  },
);

function mapProperty(property) {
  const imageUrls = Array.isArray(property.image_urls ?? property.images)
    ? (property.image_urls ?? property.images).map(resolveImageUrl)
    : [];

  const primaryImage = imageUrls[0]
    ?? property.image_url
    ?? property.image
    ?? initialProperties[0]?.image
    ?? '';

  return {
    ...property,
    houseSize: Number(property.house_size ?? property.houseSize ?? 0),
    landSize: Number(property.land_size ?? property.landSize ?? 0),
    houseAge: Number(property.house_age ?? property.houseAge ?? 0),
    latitude: property.latitude === null || property.latitude === undefined ? null : Number(property.latitude),
    longitude: property.longitude === null || property.longitude === undefined ? null : Number(property.longitude),
    image: resolveImageUrl(primaryImage),
    images: imageUrls.length > 0 ? imageUrls : [primaryImage].filter(Boolean),
    seller: property.seller_name ?? property.seller ?? 'EstateMind Seller',
    votes: property.votes ?? { low: 0, worth: 0, high: 0 },
  };
}

export async function fetchProperties(filters = {}, options = {}) {
  try {
    const params = {};

    if (filters.district?.trim()) {
      params.district = filters.district.trim();
    }

    if (filters.city?.trim()) {
      params.city = filters.city.trim();
    }

    if (filters.nearPlace?.trim()) {
      params.nearPlace = filters.nearPlace.trim();
    }

    const response = await marketplaceApi.get('/properties', { params });
    const rows = Array.isArray(response.data) ? response.data : response.data.properties;
    return rows.map(mapProperty);
  } catch (error) {
    if (options.fallbackToInitial) {
      return initialProperties;
    }

    throw error;
  }
}

export async function createProperty(payload) {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('description', payload.description);
  formData.append('district', payload.district);
  formData.append('city', payload.city);
  formData.append('price', String(payload.price));
  formData.append('bedrooms', String(payload.bedrooms));
  formData.append('bathrooms', String(payload.bathrooms));
  formData.append('house_size', String(payload.houseSize));
  formData.append('land_size', String(payload.landSize));
  formData.append('house_age', String(payload.houseAge));
  formData.append('latitude', String(payload.latitude));
  formData.append('longitude', String(payload.longitude));
  payload.images.forEach((image) => {
    formData.append('images', image);
  });

  const response = await marketplaceApi.post('/properties', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return mapProperty(response.data.property);
}

export async function updatePropertyPrice(propertyId, price) {
  const response = await marketplaceApi.put(`/properties/${propertyId}/price`, {
    price: Number(price),
  });

  return mapProperty(response.data.property);
}

export async function deleteProperty(propertyId) {
  const response = await marketplaceApi.delete(`/properties/${propertyId}`);
  return response.data;
}

export async function loginUser(payload) {
  const response = await marketplaceApi.post('/auth/login', payload);
  return response.data;
}

export async function registerUser(payload) {
  const response = await marketplaceApi.post('/auth/register', payload);
  return response.data;
}

export async function logoutUser() {
  const response = await marketplaceApi.post('/auth/logout');
  return response.data;
}

export async function predictPrice(payload) {
  const response = await marketplaceApi.post('/predictions/predict', {
    district: payload.district,
    city: payload.city,
    bedrooms: payload.bedrooms,
    bathrooms: payload.bathrooms,
    houseSize: payload.houseSize,
    landSize: payload.landSize,
    houseAge: payload.houseAge,
  });

  return response.data;
}

export async function fetchAdminSummary() {
  const response = await marketplaceApi.get('/admin/summary');
  return response.data;
}

export async function fetchAdminPredictionsPerWeek() {
  const response = await marketplaceApi.get('/admin/predictions/week');
  return response.data;
}

export async function fetchAdminPredictionsByDistrict() {
  const response = await marketplaceApi.get('/admin/predictions/district');
  return response.data;
}

export async function fetchAdminPredictionsByCity() {
  const response = await marketplaceApi.get('/admin/predictions/city');
  return response.data;
}

export async function fetchAdminPropertiesByDistrict() {
  const response = await marketplaceApi.get('/admin/properties/district');
  return response.data;
}

export async function fetchAdminMostSearchedAreas() {
  const response = await marketplaceApi.get('/admin/most-searched-areas');
  return response.data;
}
