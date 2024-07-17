import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetAreaForLoc from '../Functions/GetAreaForLoc';
import useGoogleMaps from '../Hooks/useGoogleMaps'
import GetQuantityByCate from '../Functions/GetQuantityByCate';

const ScheduleLocInArea = () => {
    const [sortedScheduleWaste, setSortedScheduleWaste] = useState({
      Area1: [],
      Area2: [],
      Area3: [],
      Area4: [],
    });
    const [sortedScheduleWasteBycate, setSortedScheduleWasteBycate] = useState({
      Area1: [],
      Area2: [],
      Area3: [],
      Area4: [],
    });
  const isGoogleMapsLoaded = useGoogleMaps('AIzaSyBG3Ua3R0x4emKkYNkGan-Ds2dDvFUaEmM'); // Replace with your API key

  // Fetch schedules from the database
  const fetchScheduleWaste = async () => {
    try {
      const response = await axios.post('http://localhost:3001/schedule/getAllScheduleWaste');
      const allScheduleWaste = response.data.allScheduleWaste;

      const sortedData = {
        Area1: [],
        Area2: [],
        Area3: [],
        Area4: [],
      };

      allScheduleWaste.forEach((item) => {
        const area = GetAreaForLoc({ checkLat: item.location.lat, checkLng: item.location.lng });
        
        console.log(area)
        if (area) {
          sortedData[area].push(item);
        }
      });

      setSortedScheduleWaste(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (isGoogleMapsLoaded) {
      fetchScheduleWaste();
    }
  }, [isGoogleMapsLoaded]);

  return (
    <div>
      {console.log(GetQuantityByCate(sortedScheduleWaste.Area1))}
    </div>
  );
};

export default ScheduleLocInArea;
