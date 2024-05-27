import React from 'react'
import UserCard from '../Basic/UserCard'
import NewUser from '../Basic/NewUser'

//get from database
const colData = [
  { id: 1, name: 'Name', vehical: 'xxx-xxxx', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', vehical: 'xxx-xxxx', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', vehical: 'xxx-xxxx', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', vehical: 'xx-xxxx', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', vehical: 'xx-xxxx', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
];

function MngColl() {
  return (
    <div className="container mx-auto p-4">
      
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <NewUser name={'Collector'}/>
      {colData.map((collector) => (
        <UserCard user={collector}/>
      ))}
    </div>
  </div>
  )
}

export default MngColl
