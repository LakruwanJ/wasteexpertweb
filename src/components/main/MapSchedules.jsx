import React, { useState, useEffect } from 'react';
import MapM from '../Basic/MapM';
import axios from 'axios';

function MapSchedules({ selectedArea,reloadMap  }) {

  const [smartbins, setSmartbins] = useState([]);
  const [scheduleWaste, setScheduleWaste] = useState([]);
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

  //fetch schedules from db
  const fetchScheduleWaste = async (callback) => {
    try {
      const response = await axios.post('http://localhost:3001/schedule/getAllScheduleWaste'); // Use Axios for GET request
      setScheduleWaste(response.data.allScheduleWaste);
      callback();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchSmartBin(() => {});
    fetchScheduleWaste(() => {});
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
    <div className="absolute w-54vw h-90vh ">
      {'abcd'+ console.log(scheduleWaste)}
      <MapM props={
        {
        type1: "food", foodbinLocation: binTypes.Organic,
        type2: "glass", glassbinLocation: binTypes.Glass,
        type3: "metal", matalLocation: binTypes.Metal,
        type4: "paper", paperbinLocation: binTypes.Paper,
        type5: "plastic", plasticbinLocation: binTypes.Plastics,
        Imagee1: "sched", ScheduleWaste: scheduleWaste,
        selections: area
      }
      } />
    </div>
  );
}

export default MapSchedules;
