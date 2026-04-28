import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ClickMarker({ location, setLocation }) {
  const [position, setPosition] = useState(
    location ? { lat: location.latitude, lng: location.longitude } : null,
  );

  useEffect(() => {
    setPosition(location ? { lat: location.latitude, lng: location.longitude } : null);
  }, [location]);

  useMapEvents({
    click(e) {
      const selectedLocation = {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      };

      setPosition(e.latlng);
      setLocation(selectedLocation);
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

function LocationPicker({ location, setLocation }) {
  return (
    <div style={{ marginTop: '15px' }}>
      <label style={{ fontWeight: 'bold' }}>Pin exact location</label>

      <MapContainer
        center={[7.8731, 80.7718]}
        zoom={8}
        style={{
          height: '350px',
          width: '100%',
          borderRadius: '18px',
          marginTop: '10px',
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickMarker location={location} setLocation={setLocation} />
      </MapContainer>
    </div>
  );
}

export default LocationPicker;
