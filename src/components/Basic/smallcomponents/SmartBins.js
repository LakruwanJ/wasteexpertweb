import React from 'react';

const SmartBins = () => {
  return (
    <section className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Smart Bins</h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-between items-center bg-purple-200 h-4 rounded">
          <span className="px-2 py-1">Category 1</span>
        </div>
        <div className="flex justify-between items-center bg-purple-400 h-4 rounded">
          <span className="px-2 py-1">Category 2</span>
        </div>
        <div className="flex justify-between items-center bg-purple-600 h-4 rounded">
          <span className="px-2 py-1">Category 3</span>
        </div>
      </div>
    </section>
  );
};

export default SmartBins;
