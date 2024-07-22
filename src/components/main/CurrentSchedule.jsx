import React, { useState, useEffect } from 'react';
import MapS from '../Basic/MapS';
import axios from 'axios';

function CurrentSchedule() {
  const [todaySchedule, setTodaySchedule] = useState([]);

  const fetchData = async () => {
    try {
      const collector = '66901b082b62d03997fd3166'; // Replace with your actual collector ID or state variable
      const response = await axios.post('http://localhost:3001/schedulePickup/getSchedulePickupToCollector', { collector });

      const today = new Date().toISOString().split('T')[0];
      console.log(today, response.data.schedulePickups);

      response.data.schedulePickups.forEach(item => {
        if (new Date(item.date).toISOString().split('T')[0] == today) {
          console.log('yes');
          setTodaySchedule(item);

        }
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <MapS props={
        {
          collectorRoot: todaySchedule, collectorRootI: 'optSche'
        }
      }
      />
      {console.log('today', todaySchedule)}
    </>
  );
}

export default CurrentSchedule;
