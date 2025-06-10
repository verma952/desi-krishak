import React, { useCallback, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
  marginBottom: '10px',
};

const center = {
  lat: 20.5937, // India center
  lng: 78.9629,
};

function LocationPicker({ location, setLocation }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAMfFgux0JTAqolJYUgifc-jmT7-UNh8pc', // 🔐 replace this
  });

  const [marker, setMarker] = useState(location || null);

  const handleMapClick = useCallback((event) => {
    const pos = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarker(pos);
    setLocation(pos);
  }, [setLocation]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={marker || center}
        zoom={marker ? 12 : 5}
        onClick={handleMapClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
      {marker && (
        <p>
          Selected Location: <strong>Lat:</strong> {marker.lat.toFixed(5)} | <strong>Lng:</strong> {marker.lng.toFixed(5)}
        </p>
      )}
    </>
  );
}

export default LocationPicker;
