import React from 'react';
import { area1, area2, area3, area4 } from '../Data/Areas';

function GetAreaForLoc(props) {
  const location = new window.google.maps.LatLng(props.checkLat, props.checkLng);

  if (window.google.maps.geometry.poly.containsLocation(location, new window.google.maps.Polygon({ paths: area1 }))) {
    return 'Area1';
  } else if (window.google.maps.geometry.poly.containsLocation(location, new window.google.maps.Polygon({ paths: area2 }))) {
    return 'Area2';
  } else if (window.google.maps.geometry.poly.containsLocation(location, new window.google.maps.Polygon({ paths: area3 }))) {
    return 'Area3';
  } else if (window.google.maps.geometry.poly.containsLocation(location, new window.google.maps.Polygon({ paths: area4 }))) {
    return 'Area4';
  } else {
    return null;
  }
}

export default GetAreaForLoc;
