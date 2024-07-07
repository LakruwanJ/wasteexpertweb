import React, { useState, useEffect } from 'react';
import Mapp from '../Basic/Map';
import axios from 'axios';

function Map() {

  const [smartbins, setSmartbins] = useState([]);

  const fetchData = async (callback) => {
    try {
      const response = await axios.post('http://localhost:3001/smartbin/getSmartBin'); // Use Axios for GET request
      setSmartbins(response.data.smartbins);
      callback();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(() => {
      console.log(smartbins); // Print data after it's set
    });
  }, []);
  
  const binTypes = {
    Glass: [],
    Plastics: [],
    Paper: [],
    Organic: [],
    Metal: []
    // Add more bin types as needed
  };

  smartbins.forEach(bin => {
    const { area, locationLat, locationLng, garbageTypes, fillLevel } = bin;
    console.log(garbageTypes)
    binTypes[garbageTypes].push({
      loc: { lat: locationLat, lng: locationLng },
      area: area,
      fillLevel: fillLevel,
    });
  });

  return (

    <div className="w-full h-full">
      <Mapp props={{
        type1: "food", foodbinLocation: binTypes.Organic,
        type2: "glass", glassbinLocation: binTypes.Glass,
        type3: "metal", matalLocation: binTypes.Metal,
        type4: "paper", paperbinLocation: binTypes.Paper,
        type5: "plastic", plasticbinLocation: binTypes.Plastics,

      }} />
    </div>
  );
}

export default Map;
