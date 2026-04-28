import '../Components-css/Prediction.css';
import icon5 from '../assets/homeicon.png';

function Predict({
  role,
  predictionForm,
  predictedPrice,
  predictionPending,
  predictionError,
  onPredictionChange,
  onPredict,
  onClear,
  formatCurrency,
}) {
  return (
    <section id="predict" className="predict-section">
      <div className="predict-wrapper">
        <div className="predict-header">
          
          <h2 className="predict-title">Estimate house value from your target property requirements</h2>
          <p className="predict-subtitle">
            This separate ML-inspired tool is designed for buyers and sellers who want to forecast a realistic price
            before buying and selling or comparing active advertisements.
          </p>
        </div>

        <div className="predict-content">
          <form className="predictLeft" onSubmit={onPredict}>
            <h3 className="panel-title">Desired property details</h3>

            <div className="field-grid two-col">
              <label className="field-group" htmlFor="district">
                <span>District</span>
                <select
                  id="district"
                  name="district"
                  value={predictionForm.district}
                  onChange={onPredictionChange}
                  className="predict-select"
                >
                  <option value="">Select district</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Gampaha">Gampaha</option>
                </select>
              </label>
              <label className="field-group" htmlFor="city">
                <span>City</span>
                <input id="city" name="city" type="text" value={predictionForm.city} onChange={onPredictionChange} />
              </label>
            </div>

            <div className="field-grid two-col">
              <label className="field-group" htmlFor="houseSize">
                <span>House size (sqft)</span>
                <input id="houseSize" name="houseSize" type="number" value={predictionForm.houseSize} onChange={onPredictionChange} />
              </label>
              <label className="field-group" htmlFor="landSize">
                <span>Land size (perches)</span>
                <input id="landSize" name="landSize" type="number" value={predictionForm.landSize} onChange={onPredictionChange} />
              </label>
            </div>

            <div className="field-grid three-col">
              <label className="field-group" htmlFor="bedrooms">
                <span>Bedrooms</span>
                <input id="bedrooms" name="bedrooms" type="number" value={predictionForm.bedrooms} onChange={onPredictionChange} />
              </label>
              <label className="field-group" htmlFor="bathrooms">
                <span>Bathrooms</span>
                <input id="bathrooms" name="bathrooms" type="number" value={predictionForm.bathrooms} onChange={onPredictionChange} />
              </label>
              
            </div>

            <div className="predict-actions">
              <button type="submit" className="predict-btn" disabled={predictionPending}>
                {predictionPending ? 'Predicting...' : 'Predict Price'}
              </button>
              <button type="button" className="predict-clear-btn" onClick={onClear} disabled={predictionPending}>
                Clear
              </button>
            </div>

            {role !== 'buyer' ? (
              <p className="predict-hint">
                Buyer role is recommended for this feature, but the estimator remains visible for demos.
              </p>
            ) : null}

            {predictionError ? <p className="predict-hint">{predictionError}</p> : null}
          </form>

          <div className="predictRight">
            <div className="result-placeholder">
              <div className="result-icon">
                <img src={icon5} alt="Home Icon" />
              </div>
              <h3>{predictedPrice === null ? 'Awaiting prediction' : formatCurrency(predictedPrice)}</h3>
              <p>
                {predictedPrice === null
                  ? 'Fill in the property details and click Predict Price to see the estimated value.'
                  : 'Estimated value based on district demand, floor area, land size, room count, and house age.'}
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Predict;
