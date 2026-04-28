import { useEffect, useState } from 'react';
import '../Components-css/MyList.css';

function MyList({ sellerListings, sellerActionError, formatCurrency, onPriceUpdate, onDeleteProperty }) {
  const [draftPrices, setDraftPrices] = useState({});

  useEffect(() => {
    setDraftPrices(
      Object.fromEntries(sellerListings.map((listing) => [listing.id, String(listing.price)])),
    );
  }, [sellerListings]);

  return (
    <section className="mylist-panel">
      <div className="mylist-header">
        <span className="section-kicker">My List</span>
        <h2>Your posted advertisements</h2>
        
      </div>

      {sellerActionError ? <p className="mylist-error">{sellerActionError}</p> : null}

      <div className="mylist-grid">
        {sellerListings.map((listing) => (
          <article key={listing.id} className="mylist-card">
            <img src={listing.image} alt={listing.title} className="mylist-image" />
            <div className="mylist-body">
              <div className="mylist-top">
                <div>
                  <p className="mylist-location">
                    {listing.district} / {listing.city}
                  </p>
                  <h3>{listing.title}</h3>
                </div>
                <span className="mylist-price">{formatCurrency(listing.price)}</span>
              </div>

              <p className="mylist-description">{listing.description}</p>

              <div className="mylist-votes">
                <span>Low: {listing.votes.low}</span>
                <span>Worth: {listing.votes.worth}</span>
                <span>High: {listing.votes.high}</span>
              </div>

              <div className="mylist-actions">
                <label className="mylist-price-editor">
                  <span>Change price</span>
                  <input
                    type="number"
                    min="0"
                    value={draftPrices[listing.id] ?? ''}
                    onChange={(event) =>
                      setDraftPrices((current) => ({
                        ...current,
                        [listing.id]: event.target.value,
                      }))
                    }
                  />
                </label>

                <button
                  type="button"
                  className="mylist-update"
                  onClick={() => onPriceUpdate(listing.id, draftPrices[listing.id])}
                >
                  Change Price
                </button>

                <button
                  type="button"
                  className="mylist-delete"
                  onClick={() => onDeleteProperty(listing.id)}
                >
                  Delete Advertisement
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MyList;
