import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';

const API_KEY = 'AIzaSyBG3Ua3R0x4emKkYNkGan-Ds2dDvFUaEmM'; // Replace with your actual API key

const Map = (props) => {
  const [mapCenter, setMapCenter] = useState({ lat: 6.7579003, lng: 81.2185123 }); // Initial center
  const [userLocations, setUserLocations] = useState([]);
  const [databaseLocations, setDatabaseLocations] = useState([]);
  const [directions, setDirections] = useState(null); // To store calculated directions

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

  // (Optional) Function to calculate the shortest path between all database locations
  // This would involve using a routing API like Google Maps Directions Service
  // or a third-party library like `react-google-maps-directions`
  const calculateRoute = async () => {
    // Implement your route calculation logic here, using userLocations or databaseLocations
    // Update the directions state with the calculated route object
    setDirections(/* route object */);
  };

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={['places']} // Add 'places' library for user location search (optional)
    >
      <GoogleMap
        mapContainerStyle={{ width: '83.5vw', height: '94vh' }}
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
        {directions && <DirectionsRenderer directions={directions} />} {/* Display calculated route */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;