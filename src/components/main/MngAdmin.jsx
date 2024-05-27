import React from 'react'
import UserCard from '../Basic/UserCard'
import NewUser from '../Basic/NewUser'

//get from database
const adminData = [
  { id: 1, name: 'Name', role: 'role', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', role: 'role', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', role: 'role', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', role: 'role', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', role: 'role', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
];

function MngAdmin() {
  return (
    <div className="container mx-auto p-4">
      
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <NewUser name={'Admin'}/>
      {adminData.map((admin) => (
        <UserCard user={admin}/>
      ))}
    </div>
  </div>
  )
}

export default MngAdmin
