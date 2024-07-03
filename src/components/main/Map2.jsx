import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const YOUR_API_KEY = 'AIzaSyBG3Ua3R0x4emKkYNkGan-Ds2dDvFUaEmM'; // Replace with your actual API key

const Map2 = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Initial center
  const [userLocations, setUserLocations] = useState([]);
  const [databaseLocations, setDatabaseLocations] = useState([]);
  const [places, setPlaces] = useState([ // Array to store place data
    { id: 1, lat: 6.7600626, lng: 81.2472668, title: "Buttala Town Center" },
    { id: 2, lat: 6.77, lng: 81.23, title: "Example Place 2" },
    // ... (add more place objects)
  ]);

  // Function to fetch live user locations from your backend API (replace with your implementation)
  const fetchLocations = async () => {
    const response = await fetch('/api/locations');
    const data = await response.json();
    setUserLocations(data.locations);
  };

  // Function to fetch database locations from your backend API (replace with your implementation)
  const fetchDatabaseLocations = async () => {
    const response = await fetch('/api/database-locations');
    const data = await response.json();
    setDatabaseLocations(data.locations);
  };

  useEffect(() => {
    fetchLocations();
    fetchDatabaseLocations();
  }, []);

  

  return (
    <LoadScript
      googleMapsApiKey={YOUR_API_KEY}
      libraries={['places']} // Add 'places' library for user location search (optional)
    >
      <GoogleMap
        mapContainerStyle={{ width: '100vw', height: '400px' }}
        center={mapCenter}
        zoom={10}
        onClick={(event) => setMapCenter(event.latLng)} // Update map center on click
      >
        {userLocations.map((location) => (
          <Marker key={location.id} position={location} />
        ))}
        {databaseLocations.map((location) => (
          <Marker key={location.id} position={location} />
        ))}
        {places.map((place) => (
          <Marker key={place.id} position={{ lat: place.lat, lng: place.lng }}>
            {place.title && ( // Optionally display title in info window on click
              <InfoWindow position={{ lat: place.lat, lng: place.lng }}>
                <div>
                  {place.title}
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map2;
