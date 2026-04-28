import { useEffect, useState } from 'react';
import '../Components-css/PropertyFilter.css';

function PropertyFilter({ filters, onFilter, onReset, searchPending = false, searchError = '' }) {
  const [district, setDistrict] = useState(filters.district ?? '');
  const [city, setCity] = useState(filters.city ?? '');
  const [nearPlace, setNearPlace] = useState(filters.nearPlace ?? '');

  useEffect(() => {
    setDistrict(filters.district ?? '');
    setCity(filters.city ?? '');
    setNearPlace(filters.nearPlace ?? '');
  }, [filters]);

  const handleSearch = () => {
    onFilter({
      district: district.trim(),
      city: city.trim(),
      nearPlace: nearPlace.trim(),
    });
  };

  return (
    <div className="property-filter">
      <div className="filter-grid">
        <label className="field-group">
          <span>District</span>
          <input
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            placeholder="e.g. Colombo or Gampaha"
          />
        </label>

        <label className="field-group">
          <span>City</span>
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="e.g. Nugegoda"
          />
        </label>

        <label className="field-group">
          <span>Near Place</span>
          <input
            type="text"
            placeholder="Search near place, university, hospital..."
            value={nearPlace}
            onChange={(event) => setNearPlace(event.target.value)}
          />
        </label>
      </div>

      {searchError ? <p className="filter-error">{searchError}</p> : null}

      <div className="filter-actions">
        <button type="button" className="primary-action" onClick={handleSearch} disabled={searchPending}>
          {searchPending ? 'Searching...' : 'Search'}
        </button>
        <button type="button" className="primary-action" onClick={onReset}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default PropertyFilter;
