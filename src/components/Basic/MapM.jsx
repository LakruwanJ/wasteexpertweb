import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  Polygon
} from '@react-google-maps/api';
import pointInPolygon from 'point-in-polygon';
//Images
import foodbin from '../Images/foodbin.png';
import glassbincon from '../Images/glassbin.png';
import metalbin from '../Images/metalbin.png';
import paperbin from '../Images/paperbin.png';
import plasticbin from '../Images/plasticbin.png';
import sched from '../Images/schedule.png';
import { area1, area2, area3, area4 } from '../Data/Areas';

const API_KEY = 'AIzaSyBG3Ua3R0x4emKkYNkGan-Ds2dDvFUaEmM';

const Map = (props) => {

  const [mapCenter, setMapCenter] = useState({ lat: 6.760744676601805, lng: 81.24733849300866 }); // Initial center

  useEffect(() => {}, []);

  function getImageForBinType(binType) {//select image for markerF
    switch (binType) {
      case 'food':
        return foodbin;
      case 'glass':
        return glassbincon;
      case 'metal':
        return metalbin;
      case 'paper':
        return paperbin;
      case 'plastic':
        return plasticbin;
      case 'sched':
        return sched;
      default:
        return null;
    }
  }

  function getArea(area) {//select area for polygon
    switch (area) {
      case 'area1':
        return area1;
      case 'area2':
        return area2;
      case 'area3':
        return area3;
      case 'area4':
        return area4;
      default:
        return null;
    }
  }

  return (
    <>
      <LoadScript
        googleMapsApiKey={API_KEY}
        libraries={['places' , 'geometry']} // Add 'places' library for user location search (optional)
      >
        <GoogleMap
          mapContainerStyle={{ width: '54vw', height: '100vh', position: 'absolute', }} // Responsive size based on viewport
          center={mapCenter}
          zoom={14}
          onClick={(event) => setMapCenter(event.latLng)} // Update map center on click
        >

          {/* show areas */}
          {props.props['selections'] ?
            props.props['selections'].map((item) => (
              <Polygon paths={getArea(item)}
                options={{ fillColor: '#FF0000', fillOpacity: 0.35, strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 2 }}
              />
            )) : null}

          {/* show bins, shedules -------- start */}
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

          {props.props['ScheduleWaste'] ?
            props.props['ScheduleWaste'].map((item) => (
              <MarkerF key="kandy" position={item.location} title="Kandy" icon={getImageForBinType(props.props["Imagee1"])} ></MarkerF>
            )) : null}
          {/* show bins, shedules -------- end */}

        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Map;
