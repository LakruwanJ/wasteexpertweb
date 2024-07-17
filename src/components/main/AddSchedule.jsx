import React, { useState, useEffect } from 'react';
import Card1 from '../Basic/Card1'
import MapSchedules from './MapSchedules'
import AddNewScheduleForm from '../main/AddNewScheduleForm'

function AddSchedule() {
  const [selectedArea, setSelectedArea] = useState('');
  const [reloadMap, setReloadMap] = useState(false);

  const handleReloadMap = () => {
    setReloadMap(!reloadMap);
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area);
  };

  function Side2(reloadMap) {
    return (
      <div class="items-center md:mt-8 flex">
        <MapSchedules selectedArea={selectedArea} reloadMap={reloadMap} />
      </div>
    )
  }

  return (
    <div>
      <Card1
        side1={<AddNewScheduleForm onAreaChange={handleAreaChange} onReloadMap={handleReloadMap} />}
        side2={<Side2 reloadMap={reloadMap} />}
      />
    </div>
  )

}

export default AddSchedule
