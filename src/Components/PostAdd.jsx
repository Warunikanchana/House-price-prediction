import '../Components-css/PostAdd.css';
import LocationPicker from './LocationPicker';

function PostAdd({
  role,
  sellerForm,
  sellerSubmitPending,
  sellerSubmitError,
  sellerDistrictError,
  sellerLocationError,
  onSellerChange,
  onSellerImageChange,
  onSellerLocationChange,
  onSubmit,
}) {
  return (
    <section className="postadd-panel">
      <div className="postadd-header">
        <span className="section-kicker">Post Add</span>
        <h2>Create a new house advertisement</h2>
        <p>Fill in the property details, choose the district, pin the exact location, and upload one or more house images.</p>
      </div>

      <form className="postadd-form" onSubmit={onSubmit}>
        <div className="field-grid two-col">
          <label className="field-group">
            <span>Advertisement title</span>
            <input
              name="title"
              value={sellerForm.title}
              onChange={onSellerChange}
              placeholder="Family home near the city"
            />
          </label>
          <label className="field-group">
            <span>District</span>
            <input
              name="district"
              value={sellerForm.district}
              onChange={onSellerChange}
              placeholder="Type district name"
              className="postadd-select"
            />
          </label>
        </div>

        {sellerDistrictError ? <p className="form-error">{sellerDistrictError}</p> : null}

        <div className="field-grid two-col">
          <label className="field-group">
            <span>City</span>
            <input name="city" value={sellerForm.city} onChange={onSellerChange} placeholder="Negombo" />
          </label>
          <label className="field-group">
            <span>Price (LKR)</span>
            <input name="price" type="number" value={sellerForm.price} onChange={onSellerChange} />
          </label>
        </div>

        <div className="field-grid three-col">
          <label className="field-group">
            <span>Bedrooms</span>
            <input name="bedrooms" type="number" value={sellerForm.bedrooms} onChange={onSellerChange} />
          </label>
          <label className="field-group">
            <span>Bathrooms</span>
            <input name="bathrooms" type="number" value={sellerForm.bathrooms} onChange={onSellerChange} />
          </label>
          <label className="field-group">
            <span>House age</span>
            <input name="houseAge" type="number" value={sellerForm.houseAge} onChange={onSellerChange} />
          </label>
        </div>

        <div className="field-grid two-col">
          <label className="field-group">
            <span>House size (sqft)</span>
            <input name="houseSize" type="number" value={sellerForm.houseSize} onChange={onSellerChange} />
          </label>
          <label className="field-group">
            <span>Land size (sqft)</span>
            <input name="landSize" type="number" value={sellerForm.landSize} onChange={onSellerChange} />
          </label>
        </div>

        <label className="field-group">
          <span>House images</span>
          <input name="images" type="file" accept="image/*" multiple onChange={onSellerImageChange} />
        </label>

        {sellerForm.images.length > 0 ? (
          <div className="postadd-image-preview">
            <img src={sellerForm.images[0].preview} alt="Selected house preview" />
            <div className="postadd-image-list">
              <strong>Selected images</strong>
              <ul>
                {sellerForm.images.map((image) => (
                  <li key={image.name}>{image.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        <LocationPicker
          location={
            sellerForm.latitude !== null && sellerForm.longitude !== null
              ? { latitude: sellerForm.latitude, longitude: sellerForm.longitude }
              : null
          }
          setLocation={onSellerLocationChange}
        />

        {sellerForm.latitude !== null && sellerForm.longitude !== null ? (
          <p className="postadd-location-text">
            Selected location: {sellerForm.latitude.toFixed(6)}, {sellerForm.longitude.toFixed(6)}
          </p>
        ) : null}

        {sellerLocationError ? <p className="form-error">{sellerLocationError}</p> : null}

        <label className="field-group">
          <span>Description</span>
          <textarea
            name="description"
            value={sellerForm.description}
            onChange={onSellerChange}
            rows="4"
            placeholder="Mention location advantages, condition, access roads, or recent renovations."
          />
        </label>

        {sellerSubmitError ? <p className="form-error">{sellerSubmitError}</p> : null}

        <button type="submit" className="primary-action" disabled={role !== 'seller' || sellerSubmitPending}>
          {sellerSubmitPending ? 'Publishing...' : 'Publish Advertisement'}
        </button>
      </form>
    </section>
  );
}

export default PostAdd;
