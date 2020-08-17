import React from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api' 

const mapContainerStyle = {height: "69vh"}

const options = {
    disableDefaultUI: true,
    zoomControl: true
}
const date = new Date().toISOString()

export default function EventMap(props) {
    const center = {
        lat: props.lat,
        lng: props.lng
    }
    return <div>
         <GoogleMap 
         mapContainerStyle={mapContainerStyle} 
         zoom={14} 
         center={center}
         options={options}>
             <Marker key={date}
             position={{lat: center.lat, lng: center.lng}}></Marker>
         </GoogleMap>
    </div>
}