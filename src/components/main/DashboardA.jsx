import React from 'react';
import SearchWithCategory from '../Basic/smallcomponents/SearchWithCategory';
import SmartBins from '../Basic/smallcomponents/SmartBins';
import WasteToCollect from '../Basic/smallcomponents/WasteToCollect';
import Map from './Map2';

function DashboardA() {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* SearchWithCategory should span 2 columns on medium and large screens */}
      <div className="col-span-1 md:col-span-2 lg:col-span-1">
        <SearchWithCategory />
      </div>
      {/* SmartBins and WasteToCollect should each take one column */}
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <SmartBins />
      </div>
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <WasteToCollect />
      </div>
      {/* Box container for the Map */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center">
        <div className="bg-gray-200 rounded-lg shadow-md w-full h-96 md:h-auto md:w-auto md:max-w-2xl lg:max-w-full lg:h-128">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default DashboardA;
