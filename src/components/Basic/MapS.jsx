import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  Polygon,
  DirectionsRenderer
} from '@react-google-maps/api';
// Images
import foodbin from '../Images/foodbin.png';
import glassbincon from '../Images/glassbin.png';
import metalbin from '../Images/metalbin.png';
import paperbin from '../Images/paperbin.png';
import plasticbin from '../Images/plasticbin.png';
import sched from '../Images/schedule.png';
import Optsched from '../Images/Optschedule.png';
import ps from '../Images/ps.png';
import { area1, area2, area3, area4 } from '../Data/Areas';
import UpdateUserSchedules from '../main/UpdateUserSchedules';

const API_KEY = 'AIzaSyBG3Ua3R0x4emKkYNkGan-Ds2dDvFUaEmM';

const MapS = (props) => {
  const [mapCenter, setMapCenter] = useState({ lat: 6.760744676601805, lng: 81.24733849300866 }); // Initial center
  const [collectorRoute, setCollectorRoute] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [waypoints, setWaypoints] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedMarkerIndex, setClickedMarkerIndex] = useState(null); // New state for clicked marker index
  const [clickedMarkerData, setClickedMarkerData] = useState(null); // New state for clicked marker data

  const [userLocation, setUserLocation] = useState(null);//live location



  useEffect(() => {
    if (props.props.collectorRoot.locations) {
      const waypointsArray = props.props.collectorRoot.locations.map(item => ({
        location: new window.google.maps.LatLng(item.location.lat, item.location.lng),
        stopover: true
      }));
      setWaypoints(waypointsArray);
    }
  }, [props.props.collectorRoot.locations]);

  //root finding
  useEffect(() => {
    const calculateBestRoute = () => {
      if (!window.google) {
        console.error('Google maps not loaded');
        return;
      }

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: mapCenter,
          destination: mapCenter,
          waypoints: waypoints,
          travelMode: 'DRIVING',
          optimizeWaypoints: true,
          drivingOptions: {
            departureTime: new Date(), // Set the departure time to now
            trafficModel: 'bestguess' // Other options: 'pessimistic', 'optimistic'
          }
        },
        (response, status) => {
          if (status === 'OK') {
            console.log('Directions response:', response);
            setDirectionsResponse(response);

            // Extract the optimized waypoints
            const optimizedWaypoints = response.routes[0].waypoint_order;
            const newMarkers = [
              mapCenter,
              ...optimizedWaypoints.map(index => waypoints[index].location),
              mapCenter
            ];

            setMarkers(newMarkers);
          } else {
            console.error('Directions request failed due to ' + status);
          }
        }
      );
    };

    if (window.google) {
      calculateBestRoute();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          calculateBestRoute();
          clearInterval(interval);
        }
      }, 100);
    }
  }, [mapCenter, waypoints]);

  //live location
  useEffect(() => {
    const getLocation = () => {

      // setUserLocation({ lat: 6.766239204109132, lng: 81.24858990082943, });
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting location: ", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();


    // Optionally, you can set an interval to update the user's location
    const intervalId = setInterval(getLocation, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);
  const openModal = (index, data) => {
    setClickedMarkerIndex(index); // Set the clicked marker index
    setClickedMarkerData(data); // Set the clicked marker data
    setIsModalOpen(true);
    console.log('Opening modal with data:', data);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setClickedMarkerIndex(null); // Clear the clicked marker index when closing the modal
    setClickedMarkerData(null); // Clear the clicked marker data when closing the modal
  };

  function getImageForBinType(binType) {
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
      case 'optSche':
        return Optsched;
      default:
        return null;
    }
  }

  function getArea(area) {
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

  function getLocationWithCoordinates(data, targetLat, targetLng) {
    if (!data.locations || !Array.isArray(data.locations)) {
      throw new Error("Invalid data format: 'locations' property is missing or not an array.");
    }
    const locationData = data.locations.find(location =>
      location.location.lat === targetLat && location.location.lng === targetLng
    );
    return locationData;
  }

  return (
    <>
      {console.log(markers)}
      <LoadScript googleMapsApiKey={API_KEY} libraries={['places', 'geometry']}>
        <GoogleMap
          mapContainerStyle={{ width: '83.5vw', height: '94vh', position: 'absolute' }} // Responsive size based on viewport
          center={mapCenter}
          zoom={10}
        >
          {/* Show areas */}
          {props.props.selections &&
            props.props.selections.map((item, index) => (
              <Polygon
                key={index}
                paths={getArea(item)}
                options={{ fillColor: '#FF0000', fillOpacity: 0.35, strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 2 }}
              />
            ))}

          {/* Show bins */}
          {props.props.foodbinLocation &&
            props.props.foodbinLocation.map((item, index) => (
              <MarkerF key={index} position={item.loc} title="Food Bin" icon={getImageForBinType(props.props.type1)} />
            ))}

          {props.props.glassbinLocation &&
            props.props.glassbinLocation.map((item, index) => (
              <MarkerF key={index} position={item.loc} title="Glass Bin" icon={getImageForBinType(props.props.type2)} />
            ))}

          {props.props.glassbinLocation &&
            props.props.glassbinLocation.map((item, index) => (
              <MarkerF key={index} position={item.loc} title="Glass Bin" icon={getImageForBinType(props.props.type3)} />
            ))}

          {props.props.paperbinLocation &&
            props.props.paperbinLocation.map((item, index) => (
              <MarkerF key={index} position={item.loc} title="Paper Bin" icon={getImageForBinType(props.props.type4)} />
            ))}

          {props.props.plasticbinLocation &&
            props.props.plasticbinLocation.map((item, index) => (
              <MarkerF key={index} position={item.loc} title="Plastic Bin" icon={getImageForBinType(props.props.type5)} />
            ))}

          {/* Show raw schedules */}
          {props.props.ScheduleWaste &&
            props.props.ScheduleWaste.map((item, index) => (
              <MarkerF key={index} position={item.location} title="Schedule" icon={getImageForBinType(props.props.Imagee1)} />
            ))}

          {/* Show optimized schedules */}
          {props.props.collectorRoot && (
            <DirectionsRenderer options={{ directions: directionsResponse }} />
          )}


          {userLocation && (
            <MarkerF
              position={userLocation}
              title="Your Location"
              icon={{ url: foodbin }} // Replace with your icon path
            />
          )}


          {console.log('aaa', markers)}
          {props.props.collectorRoot &&
            markers.map((position, index) => (
              <MarkerF
                key={index}
                position={position}
                label={(index === 0 || index === markers.length - 1) ? 'S' : index.toString()} // 'S' for start or end, numbers for waypoints
                icon={(index === 0 || index === markers.length - 1) ? ps : getImageForBinType(props.props.collectorRootI)}
                onClick={() => {
                  // Get the location data associated with the clicked marker
                  const markerData = getLocationWithCoordinates(props.props.collectorRoot, position.lat(), position.lng());
                  console.log('Clicked marker location:', { lat: position.lat(), lng: position.lng() });
                  console.log('Associated location data:', markerData);
                  openModal(index, markerData);
                }} // Pass the index and data to openModal
              />
            ))}

          {/* Modal */}
          <UpdateUserSchedules
            open={isModalOpen}
            onClose={closeModal}
            markerIndex={clickedMarkerIndex}
            markerData={clickedMarkerData}
            todaySchedule={props.props.collectorRoot}
          />

          {/* <UpdateUserSchedules open={isModalOpen} onClose={closeModal} markerIndex={clickedMarkerIndex} markerData={clickedMarkerData} todaySchedule={props.props.collectorRoot} /> */}

        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapS;
