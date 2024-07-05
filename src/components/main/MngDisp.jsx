import React from 'react'
import UserCard from '../Basic/UserCard'
import NewUser from '../Basic/NewUser'

//get from database
const disnData = [
  { id: 1, name: 'Name', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
  { id: 1, name: 'Name', job: 'This is the content of card.', mobile: '077 1234 567', image:'' },
];


function MngDisp() {
  return (
    <div className="container mx-auto p-4">
      
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <NewUser name={'Dispatcher'}/>
      {disnData.map((admin) => (
        <UserCard user={admin}/>
      ))}
    </div>
  </div>
  )
}

export default MngDisp

