import '../Components-css/Listings.css';

function Listings({ listings, allLoaded, canVote, onVote, onViewMore }) {
  return (
    <section id="listings" className="listing-section">
      <div className="listing-wrapper">
        <div className="section-heading">
          <span className="section-kicker">House Advertisements</span>
          <h2>Browse active property listings by district, city, and home details</h2>
          <p>
            Buyers can compare properties, review community price votes, and open the full advertisement feed
            with one click.
          </p>
        </div>

        <div className="listing-grid">
          {listings.map((listing) => {
            const totalVotes = listing.votes.low + listing.votes.worth + listing.votes.high;

            return (
              <article key={listing.id} className="listing-card">
                <div className="listing-card-header">
                  <div>
                    <p className="listing-location">
                      {listing.district} / {listing.city}
                    </p>
                    <h3>{listing.title}</h3>
                  </div>
                  <span className="listing-price">LKR {listing.price.toLocaleString()}</span>
                </div>

                <p className="listing-description">{listing.description}</p>

                <div className="listing-meta">
                  <span>{listing.bedrooms} beds</span>
                  <span>{listing.bathrooms} baths</span>
                  <span>{listing.houseSize} sqft house</span>
                  <span>{listing.landSize} sqft land</span>
                  <span>{listing.houseAge} yrs old</span>
                </div>

                <div className="vote-panel">
                  <div className="vote-summary">
                    <strong>Community price check</strong>
                    <span>{totalVotes} total votes</span>
                  </div>

                  <div className="vote-actions">
                    <button type="button" disabled={!canVote} onClick={() => onVote(listing.id, 'low')}>
                      Low ({listing.votes.low})
                    </button>
                    <button type="button" disabled={!canVote} onClick={() => onVote(listing.id, 'worth')}>
                      Worth ({listing.votes.worth})
                    </button>
                    <button type="button" disabled={!canVote} onClick={() => onVote(listing.id, 'high')}>
                      High ({listing.votes.high})
                    </button>
                  </div>

                  {!canVote ? <p className="vote-hint">Switch to the buyer role to vote on listing fairness.</p> : null}
                </div>
              </article>
            );
          })}
        </div>

        <div className="listing-footer">
          {!allLoaded ? (
            <button type="button" className="view-more-btn" onClick={onViewMore}>
              View More
            </button>
          ) : (
            <p className="all-loaded-text">All advertisements are now visible.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Listings;
