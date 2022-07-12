import React,{ useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "./Style/Map.css"
import Station from '../Utils/Interfaces/station.interface'
import { v4 as uuidv4 } from 'uuid';
import L from "leaflet"
import Control from 'react-leaflet-custom-control'
import BikesAvailable from './BikesAvailable';

// var greenIcon = L.icon({
//     iconUrl: 'https://img.icons8.com/office/344/street-view.png',

//     iconSize:     [38, 95], // size of the icon
//     shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });


export default function Map(): JSX.Element{
     const [stations, setStations] = useState<Station[] | []>([])
     const [longLat, setLongLat] = useState<[number, number]>([60.1699, 24.9384])
     const [doesUserHaveLocation, setDoesUserHaveLocation] = useState<boolean>(false)
     function findLocation() {
          if (navigator.geolocation) {
               if (!doesUserHaveLocation) { 
              navigator.geolocation.getCurrentPosition(position => {
                    setLongLat([ position.coords.latitude,position.coords.longitude])
                              setDoesUserHaveLocation(true)
              })
               } else {
                    setDoesUserHaveLocation(false)
                    }
          }
     }

     useEffect(() => {
        
          fetch("/api/station")
               .then(res => res.json())
               .then(res => setStations(res))
               .catch(e => console.log(e))
   }, [])
     return (
          <div>
          <MapContainer className="map" center={[longLat[0],longLat[1]]} zoom={11} scrollWheelZoom={true}>        
                    <TileLayer attribution={attribution} url={url} />
               {stations.map(e => <Marker key={uuidv4()}   position={[e.Location.coordinates[1], e.Location.coordinates[0]]}>
                    <Popup>
                         <h4>Station {e.Name}</h4>
                         <h5>Address {e.Osoite}</h5>
                         <h5>Operator {e.Operaattor}</h5>
                         <h5>Capacity {e.Kapasiteet}</h5>
                         <BikesAvailable id={e._id !== undefined ? e._id:"0"} />
                    </Popup>
               </Marker>)}  
                    <Control position="topleft" >
                         <button onClick={findLocation}>Something</button>
                    </Control>
               {doesUserHaveLocation && <Marker key={uuidv4()}  position={[longLat[0], longLat[1]]}><Popup>You are here</Popup></Marker>}
               </MapContainer>
             </div>
     )
}

const attribution = '&copy; <a target="_blank" href="https://carto.com/basemaps/">Carto Basemaps</a> contributors'
const url ="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"



