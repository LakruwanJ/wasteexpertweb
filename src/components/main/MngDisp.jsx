import React, { useState, useEffect } from 'react';
import UserCard from '../Basic/UserCard'
import NewUser from '../Basic/NewUser'
import axios from 'axios';

function MngDisp() {

  const [disData, setDisData] = useState([]);

  const fetchData = async (callback) => {
    try {
      const response = await axios.post('http://localhost:3001/addDispatcher/getAllDis'); // Use Axios for GET request
      setDisData(response.data.dispatchers);
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
    <div className="container mx-auto p-4">
      
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <NewUser name={'Dispatcher'}/>
      {disData.map((admin) => (
        <UserCard user={admin}/>
      ))}
    </div>
  </div>
  )
}

export default MngDisp

