import '../Components-css/Property.css';
import PropertyCard from './PropertyCard';

function Property({ properties, allLoaded, canVote, onVote, onViewMore, hasActiveFilters, onClearFilters }) {
  return (
    <section id="property" className="property-section">
      <div className="property-wrapper">
        <div className="section-heading">
          <span className="section-kicker">House Advertisements</span>
          <h2>Browse active property advertisements by location and house details</h2>
          <p>
            Buyers can compare homes, review seller details, and use community price voting before deciding
            what to explore next.
          </p>
        </div>

        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} canVote={canVote} onVote={onVote} />
          ))}
        </div>

        <div className="property-footer">
          {properties.length === 0 ? (
            <div className="property-empty-state">
              <p className="property-all-loaded">
                {hasActiveFilters
                  ? 'No advertisements match the current filters.'
                  : 'No advertisements are available right now.'}
              </p>
              {hasActiveFilters ? (
                <button type="button" className="view-more-btn" onClick={onClearFilters}>
                  Reset Filters
                </button>
              ) : null}
            </div>
          ) : !allLoaded ? (
            <button type="button" className="view-more-btn" onClick={onViewMore}>
              View More
            </button>
          ) : (
            <p className="property-all-loaded">All advertisements are now visible.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Property;
