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
import Iglassbincon from '../Images/glassbin.png';
import metalbin from '../Images/metalbin.png';
import paperbin from '../Images/paperbin.png';
import plasticbin from '../Images/plasticbin.png';
import sched from '../Images/schedule.png';

const API_KEY = 'AIzaSyBG3Ua3R0x4emKkYNkGan-Ds2dDvFUaEmM';

//define areas
const area1 = [
  { lat: 6.774266003298117, lng: 81.24075106844994 },
  { lat: 6.780512733259287, lng: 81.25548141251831 },
  { lat: 6.7737724752807855, lng: 81.2651781056666 },
  { lat: 6.767741638305237, lng: 81.2624222034034 },
  { lat: 6.768248434228579, lng: 81.2586455965983 },
  { lat: 6.757271150626272, lng: 81.24001773573772 },
  { lat: 6.7672144471777695, lng: 81.24463898869358 },

];

const area2 = [
  { lat: 6.757271150626272, lng: 81.24001773573772 },
  { lat: 6.768248434228579, lng: 81.2586455965983 },
  { lat: 6.767741638305237, lng: 81.2624222034034 },
  { lat: 6.735061802581335, lng: 81.25888662133853 },
  { lat: 6.742221773234042, lng: 81.23923139583977 },
  { lat: 6.755689050397938, lng: 81.24755697170606 },

];

const area3 = [
  { lat: 6.759842282186977, lng: 81.22911800396551 },
  { lat: 6.774266003298117, lng: 81.24075106844994 },
  { lat: 6.7672144471777695, lng: 81.24463898869358 },
  { lat: 6.757271150626272, lng: 81.24001773573772 },
  { lat: 6.734850554014478, lng: 81.23566384179234 },
  { lat: 6.737430907460192, lng: 81.23201901892126 },
  { lat: 6.74719195634824, lng: 81.23205529910241 },

];

const area4 = [
  { lat: 6.74719195634824, lng: 81.23205529910241 },
  { lat: 6.7365174046602485, lng: 81.22754002613087 },
  { lat: 6.7360352248032935, lng: 81.21625141546762 },
  { lat: 6.753152315978116, lng: 81.2129133854328 },
  { lat: 6.759842282186977, lng: 81.22911800396551 }
];

const Map = (props) => {

  const [mapCenter, setMapCenter] = useState({ lat: 6.760755838476916, lng: 81.24733702841034 }); // Initial center

  useEffect(() => {

  }, []);

  function getImageForBinType(binType) {//select image for markerF
    switch (binType) {
      case 'food':
        return foodbin;
      case 'glass':
        return Iglassbincon;
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
        libraries={['places']} // Add 'places' library for user location search (optional)
      >
        <GoogleMap
          mapContainerStyle={{ width: '83.5vw', height: '94vh', position: 'absolute', }} // Responsive size based on viewport
          center={mapCenter}
          zoom={10}
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

          {console.log(props.props['plasticbinLocation'])}

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
