import React, { useState, useEffect } from 'react';
import axios from 'axios';
import foodbinL from '../Images/foodbinL.png';
import glassbinL from '../Images/glassbinL.png';
import metalbinL from '../Images/metalbinL.png';
import paperbinL from '../Images/paperbinL.png';
import plasticbinL from '../Images/plasticbinL.png';

function ManageSchedules() {
  const [shedulepickup, setShedulepickups] = useState([]);
  const [organizedPickupsL, setOrganizedPickupsL] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:3001/schedulePickup/getschedulepickup'); // Use Axios for GET request
      setShedulepickups(response.data.shedulepickups);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const organizedPickups = {};
    for (const pickup of shedulepickup) {
      const dateString = pickup.date.slice(0, 10);
      if (!organizedPickups[dateString]) {
        organizedPickups[dateString] = [];
      }
      const garbageTypesArray = pickup.garbageTypes ? pickup.garbageTypes.split(',') : [];
      organizedPickups[dateString].push({
        ...pickup,
        garbageTypes: garbageTypesArray,
      });
    }
    setOrganizedPickupsL(organizedPickups);
  }, [shedulepickup]);

  const sortedDates = Object.keys(organizedPickupsL).sort((a, b) => new Date(b) - new Date(a));

  //handle delete
  const handleDelete = async (_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this schedule pickup?");
    if (confirmed) {
      try {
        const response = await axios.post('http://localhost:3001/schedulePickup/deleteschedulepickup', { _id });
        if (response.data.status) {
          console.log("Schedule pickup deleted successfully");
          fetchData(); // Refresh the data after deletion
        } else {
          console.error("Failed to delete schedule pickup:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting schedule pickup:", error);
      }
    }
  };

  return (
    <>
      <section className="w-full divide-y rounded divide-slate-200">
        {console.log('Organized Pickups:', organizedPickupsL)}
        {sortedDates.map(date => (
          <details key={date} className="p-4 group" open>
            <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900 [&::-webkit-details-marker]:hidden">
              {date}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac01 desc-ac01"
              >
                <title id="title-ac01">Open icon</title>
                <desc id="desc-ac01">
                  icon that represents the state of the summary
                </desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            {organizedPickupsL[date].map((pickup, index) => (
              <div key={index} className="mt-4 text-slate-500">
                <p><b>{pickup.area} - {pickup.status}</b></p>
                <div className="container px-6 m-auto">
                  <div className="grid grid-cols-8 gap-6 md:grid-cols-12 lg:grid-cols-12">
                    <div className="col-span-4 lg:col-span-2">
                      <center>
                        <img src={foodbinL} alt="Food bin" className="h-13" />
                        {pickup.quantity['Organic']}
                      </center>
                    </div>
                    <div className="col-span-4 lg:col-span-2">
                      <center>
                        <img src={glassbinL} alt="Glass bin" className="h-13" />
                        {pickup.quantity['Glass']}
                      </center>
                    </div>
                    <div className="col-span-4 lg:col-span-2">
                      <center>
                        <img src={metalbinL} alt="Metal bin" className="h-13" />
                        {pickup.quantity['Metal']}
                      </center>
                    </div>
                    <div className="col-span-4 lg:col-span-2">
                      <center>
                        <img src={paperbinL} alt="Paper bin" className="h-13" />
                        {pickup.quantity['Paper']}
                      </center>
                    </div>
                    <div className="col-span-4 lg:col-span-2">
                      <center>
                        <img src={plasticbinL} alt="Plastic bin" className="h-13" />
                        {pickup.quantity['Plastic']}
                      </center>
                    </div>
                  </div>
                  {/* Delete button */}
                  <div className="flex justify-end mt-4">
                    {console.log(pickup._id)}
                    <button onClick={() => handleDelete(pickup._id)} className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-red-500 px-5 text-sm font-medium tracking-wide text-white shadow-md shadow-red-200 transition duration-300 hover:bg-red-600 hover:shadow-sm hover:shadow-red-200 focus:bg-red-700 focus:shadow-sm focus:shadow-red-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300 disabled:shadow-none">
                      <span className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" alt="Delete icon">
                          <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192zm176 40c-13.3 0-24 10.7-24 24v48H152c-13.3 0-24 10.7-24 24s10.7 24 24 24h48v48c0 13.3 10.7 24 24 24s24-10.7 24-24V352h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V256c0-13.3-10.7-24-24-24z" />
                        </svg>
                      </span>
                      Delete Schedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </details>
        ))}
      </section>
    </>
  );
}

export default ManageSchedules;
