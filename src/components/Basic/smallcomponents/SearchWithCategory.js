import React from 'react';
import driverImage from '../../Images/Drivers.jpeg';

const SearchWithCategory = () => {
  return (
    <section className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Search with Category</h2>
      <div className="space-y-4">
        <select className="w-full border border-gray-300 p-2 rounded">
          <option>Select item</option>
        </select>
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-1">
            <input type="checkbox" className="form-checkbox text-teal-600" />
            <span>From resident</span>
          </label>
          <label className="flex items-center space-x-1">
            <input type="checkbox" className="form-checkbox text-teal-600" />
            <span>Smart bin</span>
          </label>
        </div>
        <button className="bg-teal-600 text-white w-full py-2 rounded">Search on map</button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        <div className="space-y-4 md:space-y-0 md:flex md:flex-wrap md:space-x-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4 md:w-1/2 lg:w-full">
              <img src={driverImage} alt="Driver" className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="text-lg font-bold">Driver Name</h3>
                <p className="text-gray-500">Lorry number</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchWithCategory;
