import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  MarkerF,
} from '@react-google-maps/api';

//Images
import foodbin from '../Images/foodbin.png';
import Iglassbincon from '../Images/glassbin.png';
import metalbin from '../Images/metalbin.png';
import paperbin from '../Images/paperbin.png';
import plasticbin from '../Images/plasticbin.png';
import sched from '../Images/schedule.png';

const API_KEY = 'AIzaSyBG3Ua3R0x4emKkYNkGan-Ds2dDvFUaEmM';

const Map = (props) => {

  const [mapCenter, setMapCenter] = useState({ lat: 6.7579003, lng: 81.2185123 }); // Initial center

  useEffect(() => {

  }, []);

  function getImageForBinType(binType) {
    switch (binType) {
      case 'food':
        return foodbin; // Your food bin image import
      case 'glass':
        return Iglassbincon; // Your glass bin image import
      case 'metal':
        return metalbin; // Your metal bin image import
      case 'paper':
        return paperbin; // Your paper bin image import
      case 'plastic':
        return plasticbin; // Your plastic bin image import
      case 'sched':
        return sched; // Your plastic bin image import
      default:
        return null; // Or a default image if binType doesn't match
    }
  }

  return (
    <>
    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={['places']} // Add 'places' library for user location search (optional)
    >
      <GoogleMap
        mapContainerStyle={{ width: '83.5vw', height: '94vh', position: 'absolute', }} // Responsive size based on viewport
        center={mapCenter}
        zoom={10}
        onClick={(event) => setMapCenter(event.latLng)} // Update map center on click
      >
        {props.props['foodbinLocation'] ?
          props.props['foodbinLocation'].map((item) => (
            <MarkerF key="kandy" position={item.loc} title="Kandy" icon={getImageForBinType(props.props["type1"])} ></MarkerF>
          )) : null}

        {props.props['glassbinLocation'] ?
          props.props['glassbinLocation'].map((item) => (
            <MarkerF key="kandy" position={item.loc} title="Kandy" icon={getImageForBinType(props.props["type2"])} ></MarkerF>
          )) : null}

        {props.props['glassbinLocation'] ?
          props.props['glassbinLocation'].map((item) => (
            <MarkerF key="kandy" position={item.loc} title="Kandy" icon={getImageForBinType(props.props["type3"])} ></MarkerF>
          )) : null}

        {props.props['paperbinLocation'] ?
          props.props['paperbinLocation'].map((item) => (
            <MarkerF key="kandy" position={item.loc} title="Kandy" icon={getImageForBinType(props.props["type4"])} ></MarkerF>
          )) : null}

        {props.props['plasticbinLocation'] ?
          props.props['plasticbinLocation'].map((item) => (
            <MarkerF key="kandy" position={item.loc} title="Kandy" icon={getImageForBinType(props.props["type5"])} ></MarkerF>
          )) : null}

        {console.log(props.props['plasticbinLocation'])}

        {props.props['ScheduleWaste'] ?
          props.props['ScheduleWaste'].map((item) => (
            <MarkerF key="kandy" position={item.location} title="Kandy" icon={getImageForBinType(props.props["Imagee1"])} ></MarkerF>
          )) : null}

      </GoogleMap>
    </LoadScript>
    </>
  );
};

export default Map;
