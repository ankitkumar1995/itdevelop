import React from "react"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from "react-google-maps"
import { mapStyle } from "./mapStyle"

const options={
  styles:mapStyle,
  zoomControlOptions:{position:1}
}
const Map = () => {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 40.421532, lng: -75.698189 }}
      options={options}
         />
  ) 
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

const ContactMap = () => {
  return (
    <div >
      <WrappedMap
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        }
        loadingElement={<div style={{ height: `100%` }} />}
        center= {{lat: -34.397, lng: 150.644}}
        containerElement={<div style={{ height: `600px`}} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  )
}

export default ContactMap
