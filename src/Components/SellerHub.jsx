import '../Components-css/SellerHub.css';

function SellerHub({
  role,
  sellerForm,
  sellerListings,
  adminMetrics,
  onSellerChange,
  onSellerImageChange,
  onSubmit,
  onPriceUpdate,
  formatCurrency,
}) {
  return (
    <section id="seller" className="seller-section">
      <div className="seller-wrapper">
        <div className="section-heading seller-heading">
          <span className="section-kicker">Seller Workspace</span>
          <h2>Post advertisements, monitor votes, and adjust asking prices</h2>
          <p>
            Registered sellers can publish a house sale ad with property details, monitor buyer votes, and
            update the asking price when market feedback changes.
          </p>
        </div>

        <div className="seller-grid">
          <form className="seller-form-card" onSubmit={onSubmit}>
            <div className="card-title-row">
              <h3>Create a new advertisement</h3>
            </div>

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
                <select name="district" value={sellerForm.district} onChange={onSellerChange} className="seller-select">
                  <option value="">Select district</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Negombo">Negombo</option>
                </select>
              </label>
            </div>

            <div className="field-grid two-col">
              <label className="field-group">
                <span>City</span>
                <input name="city" value={sellerForm.city} onChange={onSellerChange} placeholder="Maharagama" />
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
              <span>House image</span>
              <input name="image" type="file" accept="image/*" onChange={onSellerImageChange} />
            </label>

            {sellerForm.images?.length > 0 ? (
              <div className="seller-image-preview">
                <img src={sellerForm.images[0].preview} alt="Selected house preview" />
              </div>
            ) : null}

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

            <button type="submit" className="primary-action" disabled={role !== 'seller'}>
              Publish Advertisement
            </button>

            {role !== 'seller' ? (
              <p className="gate-text">Switch to the seller role to post or update property advertisements.</p>
            ) : null}
          </form>

          <div className="monitor-card">
            <h3>Seller vote monitoring</h3>
            <div className="monitor-list">
              {sellerListings.map((listing) => (
                <div key={listing.id} className="monitor-item">
                  <div className="monitor-copy">
                    <strong>{listing.title}</strong>
                    <span>
                      Votes: Low {listing.votes.low} / Worth {listing.votes.worth} / High {listing.votes.high}
                    </span>
                  </div>
                  <div className="price-editor">
                    <input
                      type="number"
                      defaultValue={listing.price}
                      disabled={role !== 'seller'}
                      onBlur={(event) => onPriceUpdate(listing.id, event.target.value)}
                    />
                    <small>{formatCurrency(listing.price)}</small>
                  </div>
                </div>
              ))}
            </div>

            
             
          </div>
        </div>
      </div>
    </section>
  );
}

export default SellerHub;
