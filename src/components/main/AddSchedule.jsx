import React from 'react'
import AreaSelect from '../Basic/AreaSelect'
import DatePicker from '../Basic/FormEliments/DatePicker'
import AvailableColSelect from '../Basic/AvailableColSelect'
import Card1 from '../Basic/Card1'
import Button from '../Basic/FormEliments/Button'
import Map from '../Basic/Map'
import CheckBox from '../Basic/FormEliments/CheckBox'

const btn1 = {
  name: "Add New Schedule",
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" alt="a">
      <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192zm176 40c-13.3 0-24 10.7-24 24v48H152c-13.3 0-24 10.7-24 24s10.7 24 24 24h48v48c0 13.3 10.7 24 24 24s24-10.7 24-24V352h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V256c0-13.3-10.7-24-24-24z" /></svg>
  )
}


function AddSchedule() {
  return (
    <div>
      <Card1 side1={<Side1 />} side2={<Side2 />} />
    </div>
  )
}

function Side1() {
  return (
    
      <div class="items-center md:mt-8">
        <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 p-6 border-2">
        <label for="price" class="block text-md font-medium leading-4 text-gray-900">
          Select Area
        </label><AreaSelect />
        <label for="price" class="block text-md font-medium leading-4 text-gray-900">
          Select Date
        </label><DatePicker />
        <label for="price" class="block text-md font-medium leading-4 text-gray-900">
          Select Collector
        </label><AvailableColSelect />
        <label for="price" class="block text-md font-medium leading-4 text-gray-900 pb-5">
          Select Garbage Types
        </label>
        <table width="100%">
          <tr>
            <td><CheckBox name="Plastics" group="cate" /></td>
            <td><CheckBox name="Polythenee" group="cate" /></td>
          </tr>
          <tr>
            <td><CheckBox name="Glass" group="cate" /></td>
            <td></td>
          </tr>
        </table><hr className='h-px my-8 bg-black border-0 dark:bg-gray-700' />
        <Button btnInfo={btn1} />

      </div>
    </div>
  )
}

function Side2() {
  return (
    <div class="items-center md:mt-8 flex">
      <Map />

    </div>
  )
}

export default AddSchedule
