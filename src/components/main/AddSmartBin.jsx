import React, { useState } from 'react';
import Card1 from '../Basic/Card1';
import MapSmartbin from '../main/MapSmartbin';
import AddNewSmartBinForm from '../main/AddNewSmartBinForm';

function AddSmartBin() {
  const [selectedArea, setSelectedArea] = useState('');
  const [reloadMap, setReloadMap] = useState(false);

  const handleReloadMap = () => {
    setReloadMap(!reloadMap);
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area);
  };

  function Side2({ reloadMap }) {
    return (
      <div className="items-center md:mt-8 flex">
        <MapSmartbin selectedArea={selectedArea} reloadMap={reloadMap} />
      </div>
    );
  }

  return (
    <div>
      <Card1
        side1={<AddNewSmartBinForm onAreaChange={handleAreaChange} onReloadMap={handleReloadMap} />}
        side2={<Side2 reloadMap={reloadMap} />}
      />
    </div>
  );
}

export default AddSmartBin;
