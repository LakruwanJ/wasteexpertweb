import React from 'react';
import Map from './Map';

const sriLankaLocations = [
  // Replace with your array of Sri Lanka travel locations
  // Each location should have an 'id', 'lat', and 'lng' property
  { id: 1, lat: 7.873054, lng: 80.771797 }, // Example: Sigiriya
  { id: 2, lat: 6.927079, lng: 79.861244 }, // Example: Kandy
];

const smartbins = [
  // Replace with your array of Smartbin objects
  // Each Smartbin object should have an 'id' and a 'location' property with 'lat' and 'lng'
  { id: 1, location: { lat: 6.777423, lng: 81.212777 } }, // Example Smartbin
];

const schedules = [
  // Replace with your array of Schedule objects
  // Each Schedule object should have an 'id' and a 'location' property with 'lat' and 'lng'
  { id: 1, location: { lat: 6.815057, lng: 81.000827 } }, // Example Schedule
];

const Map2 = () => {
  return (
    <Map smartbins={smartbins} schedules={schedules} sriLankaLocations={sriLankaLocations} />
  );
};

export default Map2;
