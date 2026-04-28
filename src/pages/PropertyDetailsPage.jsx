import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import '../Components-css/PropertyDetailsPage.css';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function PropertyDetailsPage({ properties, canVote, onVote }) {
  const { id } = useParams();
  const property = properties.find((item) => String(item.id) === id);
  const galleryImages = property?.images?.length ? property.images : property ? [property.image] : [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [property?.id]);

  if (!property) {
    return (
      <section className="property-details-page">
        <div className="property-details-card">
          <h2>Property not found</h2>
          <p>The selected advertisement could not be found.</p>
        </div>
      </section>
    );
  }

  const totalVotes = property.votes.low + property.votes.worth + property.votes.high;

  return (
    <section className="property-details-page">
      <div className="property-details-card">
        <div className="details-gallery">
          <div className="details-image-stage">
            <img
              src={galleryImages[selectedImageIndex]}
              alt={`${property.title} view ${selectedImageIndex + 1}`}
              className="details-image"
            />
            {galleryImages.length > 1 ? (
              <>
                <button
                  type="button"
                  className="details-gallery-nav details-gallery-prev"
                  onClick={() =>
                    setSelectedImageIndex((current) =>
                      current === 0 ? galleryImages.length - 1 : current - 1,
                    )
                  }
                  aria-label="Show previous image"
                >
                  &lt;
                </button>
                <button
                  type="button"
                  className="details-gallery-nav details-gallery-next"
                  onClick={() =>
                    setSelectedImageIndex((current) =>
                      current === galleryImages.length - 1 ? 0 : current + 1,
                    )
                  }
                  aria-label="Show next image"
                >
                  &gt;
                </button>
              </>
            ) : null}
          </div>
          {galleryImages.length > 1 ? (
            <div className="details-thumbnails">
              {galleryImages.map((image, index) => (
                <button
                  key={`${property.id}-image-${index + 1}`}
                  type="button"
                  className={
                    selectedImageIndex === index ? 'details-thumbnail-button active' : 'details-thumbnail-button'
                  }
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`Show image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${property.title} thumbnail ${index + 1}`}
                    className="details-thumbnail"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="details-content">
          <p className="details-location">{property.district} / {property.city}</p>
          <h1>{property.title}</h1>
          <h2 className="details-price">LKR {property.price.toLocaleString()}</h2>
          <p className="details-description">{property.description}</p>

          <div className="details-meta">
            <span>{property.bedrooms} bedrooms</span>
            <span>{property.bathrooms} bathrooms</span>
            <span>{property.houseSize} sqft house</span>
            <span>{property.landSize} perches </span>
            <span>{property.houseAge} years old</span>
          </div>

          {property.latitude !== null && property.longitude !== null ? (
            <div className="details-map-box">
              <strong>Exact property location</strong>
              <MapContainer
                center={[property.latitude, property.longitude]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: '320px', width: '100%', borderRadius: '18px', marginTop: '14px' }}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[property.latitude, property.longitude]} icon={markerIcon} />
              </MapContainer>
            </div>
          ) : null}

          <div className="details-vote-box">
            <strong>Community price check</strong>
            <p>{totalVotes} total votes</p>

            <div className="details-vote-actions">
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

            {!canVote ? <p className="details-vote-hint">Login as a buyer to vote.</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyDetailsPage;
