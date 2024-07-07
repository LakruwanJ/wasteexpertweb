import React, { useState, useEffect } from 'react';
import Card1 from '../Basic/Card1'
import Map from '../main/Map'
import AddNewSmartBinForm from '../main/AddNewSmartBinForm'

function AddSmartBin() {

  function Side2() {
    return (
      <div class="items-center md:mt-8 flex">
        <Map />
      </div>
    )
  }
  
  return (
    <div>
      <Card1 side1={<AddNewSmartBinForm />} side2={<Side2 />} />
    </div>
  )

}

export default AddSmartBin
