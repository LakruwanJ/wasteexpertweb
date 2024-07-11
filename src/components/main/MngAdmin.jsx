import React, { useState, useEffect } from 'react';
import UserCard from '../Basic/UserCard'
import NewUser from '../Basic/NewUser'
import axios from 'axios';



// //get from database
// const adminData = [
//   { id: 1, name: 'Name', role: 'role', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
//   { id: 1, name: 'Name', role: 'role', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
//   { id: 1, name: 'Name', role: 'role', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
//   { id: 1, name: 'Name', role: 'role', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
//   { id: 1, name: 'Name', role: 'role', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
// ];

function MngAdmin() {

  const [adminData, setAdminData] = useState([]);

  const fetchData = async (callback) => {
    try {
      const response = await axios.post('http://localhost:3001/addAdmin/getAllAdmin'); // Use Axios for GET request
      setAdminData(response.data.admins);
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
        <NewUser name={'Admin'} />
        {adminData.map((admin) => (
          <UserCard user={admin} />
        ))}
      </div>
    </div>
  )
}

export default MngAdmin
