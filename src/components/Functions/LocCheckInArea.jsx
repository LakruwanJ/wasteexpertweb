import React from 'react'
import { area1, area2, area3, area4 } from '../Data/Areas';

function LocCheckInArea(props) {

    function getArea(area) {//select area for polygon
        switch (area) {
            case 'Area 1':
                return area1;
            case 'Area 2':
                return area2;
            case 'Area 3':
                return area3;
            case 'Area 4':
                return area4;
            default:
                return null;
        }
    }

    console.log(props)

    // Check if the inputted location is inside the polygon
    const isInsidePolygon = window.google.maps.geometry.poly.containsLocation(new window.google.maps.LatLng(props.checkLat, props.checkLng), new window.google.maps.Polygon({ paths: getArea(props.checkarea) }));


    return isInsidePolygon
}

export default LocCheckInArea
