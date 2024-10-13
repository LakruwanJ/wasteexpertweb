import React, { useState, useEffect } from 'react';
import driverImage from '../../Images/Drivers.jpeg';
import axios from 'axios';

function SearchWithCategory() {
const [colData, setColData] = useState([]);

const fetchData = async (callback) => {
  try {
    const response = await axios.post('http://localhost:3001/addCollector/getAllCol'); // Use Axios for GET request
    setColData(response.data.collectors);
    console.log(colData)
    callback();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

useEffect(() => {
  fetchData(() => {
  });
}, []);


  return (
    <section className="p-4 bg-white rounded shadow">
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Available Collectors</h2>
      <div className="space-y-4">
        {colData.map((collector) => (
          <div key={collector.id} className="flex space-x-4 items-center mb-4">
            <img src={driverImage} alt="Driver" className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="text-lg font-bold">{collector.username}</h3>
              <p className="text-gray-500">{collector.vehicalNo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );

};
export default SearchWithCategory;
