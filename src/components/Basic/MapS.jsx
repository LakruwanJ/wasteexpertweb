import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  DirectionsRenderer,
} from '@react-google-maps/api';

//Images
import foodbin from '../Images/foodbin.png';
import Iglassbincon from '../Images/glassbin.png';
import metalbin from '../Images/metalbin.png';
import paperbin from '../Images/paperbin.png';
import plasticbin from '../Images/plasticbin.png';

const API_KEY = 'AIzaSyBG3Ua3R0x4emKkYNkGan-Ds2dDvFUaEmM'; // Replace with your actual API key

const Map = (props) => {

  const [mapCenter, setMapCenter] = useState({ lat: 6.7579003, lng: 81.2185123 }); // Initial center
  const [userLocations, setUserLocations] = useState([]);
  const [databaseLocations, setDatabaseLocations] = useState([]);
  const [directions, setDirections] = useState(null); // To store calculated directions

  // Function to fetch live user locations from your backend API (replace with your implementation)
  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations');
      const data = await response.json();
      setUserLocations(data.locations);
    } catch (error) {
      console.error('Error fetching user locations:', error);
    }
  };

  // Function to fetch database locations from your backend API (replace with your implementation)
  const fetchDatabaseLocations = async () => {
    try {
      const response = await fetch('/api/database-locations');
      const data = await response.json();
      setDatabaseLocations(data.locations);
    } catch (error) {
      console.error('Error fetching database locations:', error);
    }
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

  function getImageForBinType(binType) {
    switch (binType) {
      case 'food':
        return foodbin; // Your food bin image import
      case 'glass':
        return Iglassbincon; // Your glass bin image import
      case 'metal':
        return metalbin; // Your metal bin image import
      case 'paper':
        return paperbin; // Your paper bin image import
      case 'plastic':
        return plasticbin; // Your plastic bin image import
      default:
        return null; // Or a default image if binType doesn't match
    }
  }

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={['places']} // Add 'places' library for user location search (optional)
    >
      <GoogleMap
        mapContainerStyle={{ width: '53.5vw', height: '70vh', position: 'absolute', }} // Responsive size based on viewport
        center={mapCenter}
        zoom={10}
        onClick={(event) => setMapCenter(event.latLng)} // Update map center on click
      >
        {userLocations.map((location) => (
          <MarkerF key={location.id} position={location} />
        ))}
        {databaseLocations.map((location) => (
          <MarkerF key={location.id} position={location} />
        ))}      

        {props.props['foodbinLocation'].map((item) => (
          <MarkerF key="kandy" position={item.loc} title="Kandy" icon={getImageForBinType(props.props["type1"])} ></MarkerF>
        ))}
        {props.props['glassbinLocation'].map((item) => (
          <MarkerF key="kandy" position={item.loc} title="Kandy" icon={getImageForBinType(props.props["type2"])} ></MarkerF>
        ))}
        {props.props['matalLocation'].map((item) => (
          <MarkerF key="kandy" position={item.loc} title="Kandy" icon={getImageForBinType(props.props["type3"])} ></MarkerF>
        ))}
        {props.props['paperbinLocation'].map((item) => (
          <MarkerF key="kandy" position={item.loc} title="Kandy" icon={getImageForBinType(props.props["type4"])} ></MarkerF>
        ))}
        {props.props['plasticbinLocation'].map((item) => (
          <MarkerF key="kandy" position={item.loc} title="Kandy" icon={getImageForBinType(props.props["type5"])} ></MarkerF>
        ))}

        {directions && <DirectionsRenderer directions={directions} />} {/* Display calculated route */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
