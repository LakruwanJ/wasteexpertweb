import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetAreaForLoc from '../Functions/GetAreaForLoc';

const ScheduleLocInArea = (area) => {
    const [sortedScheduleWaste, setSortedScheduleWaste] = useState({
      Area1: [],
      Area2: [],
      Area3: [],
      Area4: [],
    });

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
      fetchScheduleWaste();
  }, []);

  return sortedScheduleWaste
};

export default ScheduleLocInArea;
