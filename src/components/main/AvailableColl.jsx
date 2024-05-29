import React from 'react'
import UserCard from '../Basic/UserCard'

//get from database
const colData = [
  { id: 1, name: 'Name', vehical: 'xxx-xxxx', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', vehical: 'xxx-xxxx', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', vehical: 'xxx-xxxx', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', vehical: 'xx-xxxx', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', vehical: 'xx-xxxx', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
];

function AvailableColl() {
  return (
      
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {colData.map((collector) => (
        <UserCard user={collector}/>
      ))}
    </div>

  )
}

export default AvailableColl
