import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
} from '@react-google-maps/api';

const YOUR_API_KEY = 'AIzaSyBG3Ua3R0x4emKkYNkGan-Ds2dDvFUaEmM'; // Replace with your actual API key


const MyMapComponent = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 6.7579003, lng: 81.2185123 }); // Initial center
  const [areas, setAreas] = useState([ // Array of area definitions (center, radius)
    { center: { lat: 6.7579003, lng: 81.2185123 }, radius: 5000 }, // Replace with your desired areas
  ]);
  const [geocodes, setGeocodes] = useState([ // Array of geocodes (lat, lng)
    { lat: 7.29, lng: 80.61 },
    { lat: 7.28, lng: 80.62 },
    // ... (add more geocodes)
  ]);
  const [geocodeResults, setGeocodeResults] = useState([]); // To store results


  useEffect(() => {
    // ... (fetch your geocodes from an external source)
  }, []);



  return (
    <LoadScript
      googleMapsApiKey={YOUR_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={{ width: '100vw', height: '50vw' }}
        center={mapCenter}
        zoom={10}
      >
        {areas.map((area) => (
          <Circle
            key={area.center.lat + area.center.lng}
            center={area.center}
            radius={area.radius}
            strokeColor="#FF0000"
            strokeOpacity={0.5}
            fillColor="#FF0000"
            fillOpacity={0.15}
          />
        ))}
        {geocodes.map((geocode) => (
          <Marker key={geocode.lat + geocode.lng} position={geocode} />
        ))}
        {/* Display results based on geocodeResults */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMapComponent;
