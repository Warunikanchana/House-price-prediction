import { Link } from 'react-router-dom';
import '../Components-css/PropertyCard.css';

function PropertyCard({ property, canVote, onVote }) {
  const totalVotes = property.votes.low + property.votes.worth + property.votes.high;

  return (
    <article className="property-card">
      <div className="property-image-wrap">
        <img src={property.image} alt={property.title} className="property-image" />
      </div>

      <div className="property-card-header">
        <div>
          <p className="property-location">
            {property.district} / {property.city}
          </p>
          <h3>{property.title}</h3>
        </div>
        <span className="property-price">LKR {property.price.toLocaleString()}</span>
      </div>

      <p className="property-description">{property.description}</p>

      <div className="property-meta">
        <span>{property.bedrooms} beds</span>
        <span>{property.bathrooms} baths</span>
        <span>{property.houseSize} sqft house</span>
        <span>{property.landSize} perches</span>
        <span>{property.houseAge} yrs old</span>
      </div>
      <div className="property-card-actions">
        <Link to={`/properties/${property.id}`} className="primary-action">
          View Details
        </Link>
      </div>

      <div className="property-vote-panel">
        <div className="property-vote-summary">
          <strong>Community price check</strong>
          <span>{totalVotes} total votes</span>
        </div>

        <div className="property-vote-actions">
          <button type="button" disabled={!canVote} onClick={() => onVote(property.id, 'low')}>
            Low ({property.votes.low})
          </button>
          <button type="button" disabled={!canVote} onClick={() => onVote(property.id, 'worth')}>
            Worth ({property.votes.worth})
          </button>
          <button type="button" disabled={!canVote} onClick={() => onVote(property.id, 'high')}>
            High ({property.votes.high})
          </button>
        </div>

        {!canVote ? <p className="property-vote-hint">Login as a buyer to vote on listing fairness.</p> : null}
      </div>
    </article>
  );
}

export default PropertyCard;
