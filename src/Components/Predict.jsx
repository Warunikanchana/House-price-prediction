import '../Components-css/Prediction.css'
import icon5 from '../assets/homeicon.png';

function Predict() {

  return (
    <section id="predict" className="predict-section">
      <div className="predict-wrapper">
        <div className="predict-header">
          <h2 className="predict-title">Property Valuation Tool</h2>
          <p className="predict-subtitle">
            Fill in the details below to get an instant AI-powered market valuation for your property.
          </p>
        </div>

        <div className="predict-content">
          <div className="predictLeft">
            <h3 className="panel-title">Property Details</h3>

            <div className="field-grid two-col">
              <div className="field-group">
                <label htmlFor="location">Distric</label>
                <input id="location" type="text" placeholder="colombo" />
              </div>
              <div className="field-group">
                 <label htmlFor="city">city</label>
                 <input id="city" type="text" placeholder="kottawa" />
              </div>
            </div>

            <div className="field-grid two-col">
              <div className="field-group">
                <label htmlFor="Housearea">House Area (sqft)</label>
                <input id="Housearea" type="number" placeholder="1200" />
              </div>
              <div className="field-group">
                <label htmlFor="Landarea">Land size (sqft)</label>
                <input id="Landarea" type="number" placeholder="3000" />
              </div>
            </div>

            <div className="field-grid two-col">
              <div className="field-group">
                <label htmlFor="bedrooms">Bedrooms</label>
                <input id="bedrooms" type="number" placeholder="2" />
              </div>
              <div className="field-group">
                <label htmlFor="bathrooms">Bathrooms</label>
                <input id="bathrooms" type="number" placeholder="2" />
              </div>
            </div>

            

            <button type="button" className="predict-btn" >
              Predict Price
            </button>
          </div>

          <div className="predictRight">
            <div className="result-placeholder">
              <div className="result-icon">
                <img src={icon5} alt="Home Icon" />
              </div>
              <h3>Ready to Predict</h3>
              <p>Enter your property details and click</p>
              <p>"Predict Price" to see the magic happen.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Predict;
