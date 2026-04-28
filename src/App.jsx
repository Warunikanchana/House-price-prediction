import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Contact from './Components/Contact';
import AuthModal from './Components/AuthModal';
import {
  defaultPredictionForm,
  emptySellerForm,
  roleConfig,
} from './data/properties';
import { currencyFormatter } from './utils/pricing';
import {
  createProperty,
  deleteProperty,
  fetchAdminMostSearchedAreas,
  fetchAdminPredictionsByCity,
  fetchAdminPredictionsByDistrict,
  fetchAdminPredictionsPerWeek,
  fetchAdminPropertiesByDistrict,
  fetchAdminSummary,
  fetchProperties,
  loginUser,
  logoutUser,
  predictPrice,
  registerUser,
  updatePropertyPrice,
} from './services/marketplaceApi';
import HomePage from './pages/HomePage';
import PropertyPage from './pages/PropertyPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import SellerPage from './pages/SellerPage';
import PredictPage from './pages/PredictPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import AdminPage from './pages/AdminPage';

function App() {
  const allowedDistricts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle', 'Matara',
    'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya', 'Trincomalee',
    'Batticaloa', 'Ampara', 'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Monaragala', 'Ratnapura', 'Kegalle',
  ];

  const [role, setRole] = useState('buyer');
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authPending, setAuthPending] = useState(false);
  const [authError, setAuthError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [predictionPending, setPredictionPending] = useState(false);
  const [predictionError, setPredictionError] = useState('');
  const [properties, setProperties] = useState([]);
  const [propertySearchResults, setPropertySearchResults] = useState(null);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertySearchPending, setPropertySearchPending] = useState(false);
  const [propertySearchError, setPropertySearchError] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [adminData, setAdminData] = useState({
    summary: null,
    predictionsPerWeek: [],
    predictionsByDistrict: [],
    predictionsByCity: [],
    propertiesByDistrict: [],
    mostSearchedAreas: [],
  });
  const [visibleCount, setVisibleCount] = useState(3);
  const [sellerForm, setSellerForm] = useState(emptySellerForm);
  const [sellerSubmitPending, setSellerSubmitPending] = useState(false);
  const [sellerSubmitError, setSellerSubmitError] = useState('');
  const [sellerLocationError, setSellerLocationError] = useState('');
  const [sellerActionError, setSellerActionError] = useState('');
  const [predictionForm, setPredictionForm] = useState(defaultPredictionForm);
  const [filters, setFilters] = useState({
    district: '',
    city: '',
    nearPlace: '',
  });
  const [predictedPrice, setPredictedPrice] = useState(null);

  useEffect(() => {
    const savedUser = window.localStorage.getItem('currentUser');
    const savedToken = window.localStorage.getItem('authToken');

    if (!savedToken || savedToken === 'undefined' || savedToken === 'null') {
      window.localStorage.removeItem('authToken');
      window.localStorage.removeItem('currentUser');
      return;
    }

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setRole(parsedUser.role ?? 'buyer');
      } catch (_error) {
        window.localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const loadAdminDashboard = async () => {
    setAdminLoading(true);
    setAdminError('');

    try {
      const [
        summary,
        predictionsPerWeek,
        predictionsByDistrict,
        predictionsByCity,
        propertiesByDistrict,
        mostSearchedAreas,
      ] = await Promise.all([
        fetchAdminSummary(),
        fetchAdminPredictionsPerWeek(),
        fetchAdminPredictionsByDistrict(),
        fetchAdminPredictionsByCity(),
        fetchAdminPropertiesByDistrict(),
        fetchAdminMostSearchedAreas(),
      ]);

      setAdminData({
        summary,
        predictionsPerWeek,
        predictionsByDistrict,
        predictionsByCity,
        propertiesByDistrict,
        mostSearchedAreas,
      });
    } catch (error) {
      setAdminError(
        error.response?.data?.message
          || error.message
          || 'Unable to load the admin dashboard right now.',
      );
    } finally {
      setAdminLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadProperties = async () => {
      try {
        const response = await fetchProperties({}, { fallbackToInitial: true });
        if (active) {
          setProperties(response);
        }
      } finally {
        if (active) {
          setPropertiesLoading(false);
        }
      }
    };

    loadProperties();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      loadAdminDashboard();
    }
  }, [currentUser?.role]);

  const homeVisibleProperties = properties.slice(0, visibleCount);
  const propertyPageProperties = propertySearchResults ?? properties;
  const propertyPageVisibleProperties = propertyPageProperties.slice(0, visibleCount);
  const hasActiveFilters = Boolean(filters.district || filters.city || filters.nearPlace);
  const normalizeDistrict = (value) => value.trim().replace(/\s+/g, ' ').toLowerCase();
  const sellerDistrictError = useMemo(() => {
    if (!sellerForm.district.trim()) {
      return '';
    }

    const isAllowedDistrict = allowedDistricts.some(
      (district) => normalizeDistrict(district) === normalizeDistrict(sellerForm.district),
    );

    return isAllowedDistrict
      ? ''
      : 'Please enter a valid Sri Lankan district name.';
  }, [sellerForm.district]);

  const sellerProperties = useMemo(
    () => {
      if (!currentUser?.name) return [];
      return properties.filter((property) => property.seller === currentUser.name);
    },
    [properties, currentUser],
  );

  const adminMetrics = useMemo(() => {
    const totals = properties.reduce(
      (accumulator, property) => {
        accumulator.totalVotes += property.votes.low + property.votes.worth + property.votes.high;
        accumulator.totalValue += property.price;
        return accumulator;
      },
      { totalVotes: 0, totalValue: 0 },
    );

    return {
      listingCount: properties.length,
      totalVotes: totals.totalVotes,
      averagePrice: properties.length ? Math.round(totals.totalValue / properties.length) : 0,
    };
  }, [properties]);

  const updateNumericForm = (setter, numericFields) => (event) => {
    const { name, value } = event.target;
    setter((current) => ({
      ...current,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handlePredictionChange = (event) => {
    const { name, value } = event.target;
    const numericFields = ['bedrooms', 'bathrooms', 'houseSize', 'landSize', 'houseAge'];

    setPredictionForm((current) => ({
      ...current,
      [name]: numericFields.includes(name) ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleFilterSearch = async (nextFilters) => {
    setPropertySearchPending(true);
    setPropertySearchError('');
    setFilters(nextFilters);
    setVisibleCount(3);

    try {
      const response = await fetchProperties(nextFilters);
      setPropertySearchResults(response);
    } catch (error) {
      setPropertySearchError(
        error.response?.data?.message
          || error.message
          || 'Unable to search properties right now.',
      );
    } finally {
      setPropertySearchPending(false);
    }
  };

  const handleFilterReset = async () => {
    const clearedFilters = {
      district: '',
      city: '',
      nearPlace: '',
    };

    setPropertySearchPending(true);
    setPropertySearchError('');
    setFilters(clearedFilters);
    setPropertySearchResults(null);
    setVisibleCount(3);

    try {
      const response = await fetchProperties({}, { fallbackToInitial: true });
      setProperties(response);
    } catch (error) {
      setPropertySearchError(
        error.response?.data?.message
          || error.message
          || 'Unable to reload properties right now.',
      );
    } finally {
      setPropertySearchPending(false);
    }
  };

  const handleSellerImageChange = (event) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    if (files.some((file) => file.size > 5 * 1024 * 1024)) {
      setSellerSubmitError('Image is too large. Please choose an image smaller than 5 MB.');
      event.target.value = '';
      return;
    }

    setSellerSubmitError('');
    setSellerForm((current) => ({
      ...current,
      images: files.map((file) => ({
        file,
        name: file.name,
        preview: URL.createObjectURL(file),
      })),
    }));
  };

  const handleSellerLocationChange = (location) => {
    setSellerLocationError('');
    setSellerForm((current) => ({
      ...current,
      latitude: location.latitude,
      longitude: location.longitude,
    }));
  };

  const handleVote = (propertyId, voteType) => {
    if (role !== 'buyer') {
      return;
    }

    setProperties((current) =>
      current.map((property) =>
        property.id === propertyId
          ? {
              ...property,
              votes: {
                ...property.votes,
                [voteType]: property.votes[voteType] + 1,
              },
            }
          : property,
      ),
    );
  };

  const handleSellerSubmit = async (event) => {
    event.preventDefault();
    if (role !== 'seller') {
      return;
    }

    if (sellerDistrictError) {
      setSellerSubmitError('Please fix the district before publishing the advertisement.');
      return;
    }

    if (sellerForm.latitude === null || sellerForm.longitude === null) {
      setSellerLocationError('Please pin the property location on the map.');
      return;
    }

    setSellerSubmitPending(true);
    setSellerSubmitError('');
    setSellerLocationError('');

    try {
      const createdProperty = await createProperty({
        ...sellerForm,
        images: sellerForm.images.map((image) => image.file),
      });

      setProperties((current) => [createdProperty, ...current]);
      setSellerForm(emptySellerForm);
      setVisibleCount((current) => current + 1);
    } catch (error) {
      if (error.response?.status === 401) {
        setRole('buyer');
        setCurrentUser(null);
        setSellerSubmitError('Your login session expired. Please log in again as seller and then publish the advertisement.');
        setAuthMode('login');
        setAuthOpen(true);
        return;
      }

      setSellerSubmitError(
        error.response?.data?.message
          || error.message
          || 'Unable to save the advertisement to the database.',
      );
    } finally {
      setSellerSubmitPending(false);
    }
  };

  const handlePredict = async (event) => {
    event.preventDefault();
    setPredictionPending(true);
    setPredictionError('');

    try {
      const response = await predictPrice(predictionForm);
      setPredictedPrice(Number(response.predicted_price));
    } catch (error) {
      setPredictedPrice(null);
      setPredictionError(error.response?.data?.message || error.message || 'Prediction failed.');
    } finally {
      setPredictionPending(false);
    }
  };

  const handleClearPrediction = () => {
    setPredictionForm(defaultPredictionForm);
    setPredictedPrice(null);
    setPredictionError('');
  };

  const handlePriceUpdate = async (propertyId, nextPrice) => {
    if (role !== 'seller') {
      return;
    }

    setSellerActionError('');

    try {
      const updatedProperty = await updatePropertyPrice(propertyId, nextPrice);
      setProperties((current) =>
        current.map((property) =>
          property.id === propertyId ? { ...property, ...updatedProperty } : property,
        ),
      );
    } catch (error) {
      setSellerActionError(
        error.response?.data?.message
          || error.message
          || 'Unable to update the advertisement price.',
      );
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (role !== 'seller') {
      return;
    }

    setSellerActionError('');

    try {
      await deleteProperty(propertyId);
      setProperties((current) => current.filter((property) => property.id !== propertyId));
    } catch (error) {
      setSellerActionError(
        error.response?.data?.message
          || error.message
          || 'Unable to delete the advertisement.',
      );
    }
  };

  const handleAuthSubmit = async (mode, payload) => {
    setAuthPending(true);
    setAuthError('');

    try {
      const response = mode === 'login' ? await loginUser(payload) : await registerUser(payload);
      setRole(response.role);
      setCurrentUser(response.user);
      window.localStorage.setItem('authToken', response.token);
      window.localStorage.setItem('currentUser', JSON.stringify(response.user));
      setAuthOpen(false);
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Unable to complete authentication right now.');
    } finally {
      setAuthPending(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (_error) {
      // Local logout should still complete even if the backend request fails.
    } finally {
      window.localStorage.removeItem('authToken');
      window.localStorage.removeItem('currentUser');
      setCurrentUser(null);
      setRole('buyer');
      setAdminError('');
      setSellerSubmitError('');
      setSellerActionError('');
      setAuthError('');
    }
  };

  return (
    <div className="app-shell">
      <Navbar
        role={role}
        currentUser={currentUser}
        onOpenAuth={() => setAuthOpen(true)}
        onLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={(
            <HomePage
              currentRole={roleConfig[role]}
              properties={homeVisibleProperties}
              allLoaded={visibleCount >= properties.length}
              canVote={role === 'buyer'}
              onVote={handleVote}
              onViewMore={() => setVisibleCount(properties.length)}
            />
          )}
        />

        <Route
          path="/seller"
          element={(
            <SellerPage
              role={role}
              sellerForm={sellerForm}
              sellerListings={sellerProperties}
              adminMetrics={adminMetrics}
              sellerSubmitPending={sellerSubmitPending}
              sellerSubmitError={sellerSubmitError}
              sellerDistrictError={sellerDistrictError}
              sellerLocationError={sellerLocationError}
              sellerActionError={sellerActionError}
              onSellerChange={updateNumericForm(setSellerForm, ['bedrooms', 'bathrooms', 'houseSize', 'landSize', 'houseAge', 'price'])}
              onSellerImageChange={handleSellerImageChange}
              onSellerLocationChange={handleSellerLocationChange}
              onSubmit={handleSellerSubmit}
              onPriceUpdate={handlePriceUpdate}
              onDeleteProperty={handleDeleteProperty}
              predictionForm={predictionForm}
              predictedPrice={predictedPrice}
              predictionPending={predictionPending}
              predictionError={predictionError}
              onPredictionChange={handlePredictionChange}
              onPredict={handlePredict}
              onClear={handleClearPrediction}
              formatCurrency={(value) => currencyFormatter.format(value)}
            />
          )}
        />

        <Route
          path="/properties"
          element={(
            <PropertyPage
              properties={propertyPageVisibleProperties}
              allLoaded={visibleCount >= propertyPageProperties.length}
              canVote={role === 'buyer'}
              onVote={handleVote}
              onViewMore={() => setVisibleCount(propertyPageProperties.length)}
              filters={filters}
              onFilter={handleFilterSearch}
              onFilterReset={handleFilterReset}
              hasActiveFilters={hasActiveFilters}
              searchPending={propertySearchPending}
              searchError={propertySearchError}
            />
          )}
        />
        <Route
          path="/properties/:id"
          element={<PropertyDetailsPage properties={properties} canVote={role === 'buyer'} onVote={handleVote} />}
        />

        <Route
          path="/predict"
          element={(
            <PredictPage
              role={role}
              predictionForm={predictionForm}
              predictedPrice={predictedPrice}
              predictionPending={predictionPending}
              predictionError={predictionError}
              onPredictionChange={handlePredictionChange}
              onPredict={handlePredict}
              onClear={handleClearPrediction}
              onClearPrediction={handleClearPrediction}
              formatCurrency={(value) => currencyFormatter.format(value)}
            />
          )}
        />
        <Route
          path="/admin"
          element={(
            <AdminPage
              role={role}
              currentUser={currentUser}
              adminData={adminData}
              adminLoading={adminLoading}
              adminError={adminError}
              onRefresh={loadAdminDashboard}
              onOpenAuth={() => {
                setAuthMode('login');
                setAuthOpen(true);
              }}
            />
          )}
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Contact onOpenAuth={() => setAuthOpen(true)} />
      <AuthModal
        isOpen={authOpen}
        mode={authMode}
        pending={authPending}
        error={authError}
        onClose={() => setAuthOpen(false)}
        onModeChange={setAuthMode}
        onSubmit={handleAuthSubmit}
      />
      {propertiesLoading ? <div className="loading-strip">Loading properties with axios...</div> : null}
    </div>
  );
}

export default App;
