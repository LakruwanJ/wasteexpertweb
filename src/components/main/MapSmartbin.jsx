import React, { useState, useEffect } from 'react';
import Mapp from '../Basic/Map';
import axios from 'axios';

function Map({ selectedArea,reloadMap  }) {

  const [smartbins, setSmartbins] = useState([]);
  const [area, setArea] = useState([getArea(selectedArea)]);

  function getArea(selectedArea) {//select area for polygon
    switch (selectedArea) {
      case 'Area 1':
        return 'area1';
      case 'Area 2':
        return 'area2';
      case 'Area 3':
        return 'area3';
      case 'Area 4':
        return 'area4';
      default:
        return null;
    }
  }

  console.log(selectedArea)
  //fetch smart bins from db
  const fetchSmartBin = async (callback) => {
    try {
      const response = await axios.post('http://localhost:3001/smartbin/getSmartBin');
      setSmartbins(response.data.smartbins);
      callback();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchSmartBin(() => {});
  }, [reloadMap]);
  
  const binTypes = {
    Glass: [],
    Plastics: [],
    Paper: [],
    Organic: [],
    Metal: []
  };

  // categorize smart bins that fetch from db 
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
      <Mapp props={
        {
        type1: "food", foodbinLocation: binTypes.Organic,
        type2: "glass", glassbinLocation: binTypes.Glass,
        type3: "metal", matalLocation: binTypes.Metal,
        type4: "paper", paperbinLocation: binTypes.Paper,
        type5: "plastic", plasticbinLocation: binTypes.Plastics,
        selections: area
      }
      } />
    </div>
  );
}

export default Map;
