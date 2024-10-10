import React, { useState, useEffect } from 'react';
import MapS from '../Basic/MapS';
import axios from 'axios';

function CurrentSchedule() {
  const [todaySchedule, setTodaySchedule] = useState({});

  // Fetch schedule data from the server
  const fetchData = async () => {
    try {
      const collector = '66901a3fe5138345ad0f9c44'; // Replace with your actual collector ID
      const response = await axios.post('http://localhost:3001/schedulePickup/getSchedulePickupToCollector', { collector });

      const today = new Date().toISOString().split('T')[0];
      console.log(today, response.data.schedulePickups);

      // Find today's schedule
      const todayData = response.data.schedulePickups.find(item =>
        new Date(item.date).toISOString().split('T')[0] === today
      );

      if (todayData) {
        setTodaySchedule(todayData); // Update state with today's schedule
      } else {
        setTodaySchedule({}); // Reset state if no schedule found for today
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  // Handle schedule update
  const handleScheduleUpdate = () => {
    fetchData(); // Re-fetch data to update UI
    console.log('Schedule updated');
  };

  // Start collecting schedule
  const handleStartCollecting = async () => {
    try {
      const response = await axios.post('http://localhost:3001/schedulePickup/startSchedulePickup', {
        id: todaySchedule.id // Send today's schedule ID
      });

      // Update local state to reflect the status change
      console.log('Schedule updated:', response.data);
      fetchData(); // Re-fetch data to update the status
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };

  // Finish collecting schedule
  const handleFinishCollecting = async () => {
    try {
      const response = await axios.post('http://localhost:3001/schedulePickup/finishSchedulePickup', {
        id: todaySchedule.id // Send today's schedule ID
      });

      // Update local state to reflect the status change
      console.log('Schedule updated:', response.data);
      fetchData(); // Re-fetch data to update the status
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };

  // Determine the statuses
  const isCollectingEnabled = todaySchedule.status === 'Started';
  const isStartButtonDisabled = todaySchedule.status !== 'pending';
  const isFinishButtonDisabled = todaySchedule.status !== 'Started';

  return (
    <>
      <div className="h-full flex items-center justify-center bg-white">
        <div className="p-6 flex items-center justify-center w-full h-full">

        {Object.keys(todaySchedule).length === 0 ? (
            <div>No Any Schedules for Today</div> // Log if todaySchedule is empty
        ) : (
          <div>
          <button
            onClick={handleStartCollecting}
            disabled={isStartButtonDisabled} // Disable if status is 'Started'
            className={`inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-6 text-sm font-medium tracking-wide text-white transition duration-300 ${isStartButtonDisabled ? 'disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none' : 'hover:bg-emerald-600 focus:bg-emerald-700'}`}
          >
            <span>Start Collecting</span>
          </button>

          <button
            onClick={handleFinishCollecting}
            disabled={isFinishButtonDisabled} // Disable if status is 'Pending'
            className={`ml-6 inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-6 text-sm font-medium tracking-wide text-white transition duration-300 ${isFinishButtonDisabled ? 'disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none' : 'hover:bg-emerald-600 focus:bg-emerald-700'}`}
          >
            <span>Finish Collecting</span>
          </button>
        </div>
        )}

          
        </div>
      </div>

      <div
        style={{
          pointerEvents: isCollectingEnabled ? 'auto' : 'none', // Enable or disable interactions based on status
          opacity: isCollectingEnabled ? 1 : 0.5 // Change opacity for visual feedback
        }}
      >
        <MapS
          props={{
            collectorRoot: todaySchedule,
            collectorRootI: 'optSche',
            onScheduleUpdate: handleScheduleUpdate,
          }}
        />
      </div>
      {console.log('today', todaySchedule)} {/* For debugging */}
    </>
  );
}

export default CurrentSchedule;
