import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userImg from "../../Images/user.png"; // Import the fallback image

function SearchWithCategory() {
  const [colData, setColData] = useState([]);
  const [proPics, setProPics] = useState({}); // State to store profile pictures for each user

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:3001/addCollector/getAllCol');
      setColData(response.data.collectors);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Image base URL (update this URL as per your server setup)
  const imageBaseUrl = "http://localhost:3001/uploads/users/";

  const handleImageLoad = (username) => {
    const imageUrl = imageBaseUrl + username + ".png";
    const img = new Image();
    
    img.onload = function () {
      setProPics((prevPics) => ({ ...prevPics, [username]: imageUrl }));
    };
    
    img.onerror = function () {
      // Fallback to userImg if the image doesn't load
      setProPics((prevPics) => ({ ...prevPics, [username]: userImg }));
    };
    
    img.src = imageUrl;
  };

  return (
    <section className="p-4 bg-white rounded shadow">
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Available Collectors</h2>
        <div className="space-y-4">
          {colData.map((collector) => {
            const imageUrl = proPics[collector.username] || userImg;

            // Attempt to load the image for each collector
            handleImageLoad(collector.username);

            return (
              <div key={collector.id} className="flex space-x-4 items-center mb-4">
                <img
                  src={imageUrl}
                  alt={collector.username}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-bold">{collector.username}</h3>
                  <p className="text-gray-500">{collector.vehicalNo}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SearchWithCategory;
