import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      // Extract the date in YYYY-MM-DD format
      const dateString = pickup.date.slice(0, 10);
      // If the date doesn't exist as a key, create an empty array for it
      if (!organizedPickups[dateString]) {
        organizedPickups[dateString] = [];
      }
      // Convert garbageTypes string to an array, ensure it's defined
      const garbageTypesArray = pickup.garbageTypes ? pickup.garbageTypes.split(',') : [];

      // Add the current pickup to the array for its date, with garbageTypes as an array
      organizedPickups[dateString].push({
        ...pickup,
        garbageTypes: garbageTypesArray,
      });
    }
    setOrganizedPickupsL(organizedPickups);
  }, [shedulepickup]);

  return (
    <>
      {/*<!-- Component: Basic accordion --> */}
      <section className="w-full divide-y rounded divide-slate-200">
        {/* Display organized pickups */}
        {Object.entries(organizedPickupsL).map(([date, pickups]) => (
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
            {pickups.map((pickup, index) => (
              <div key={index} className="mt-4 text-slate-500">
                <p> <b>Collector ID : </b>{pickup.collector} <br /> <b>Status : </b>{pickup.Status}</p>
                <p><b>Garbage Types :</b></p>
                <ul>
                  {pickup.garbageTypes.map((type, idx) => (
                    <li key={idx}>{type}</li>
                  ))}
                </ul>
              </div>
            ))}
          </details>
        ))}
      </section>
      {/*<!-- End Basic accordion --> */}
    </>
  );
}

export default ManageSchedules;
