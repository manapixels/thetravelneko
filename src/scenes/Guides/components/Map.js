import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'

import CountryHotspot from './CountryHotspot'

const Wrapper = styled.div`
   width: 100%;
   height: 85vh;
   div {
      div {
         border-radius: 0.5rem;
      }
   }
`

const defaultProps = {
   center: {
      lat: 1.4159,
      lng: 103.766449,
   },
   zoom: 9,
   hotspots: [
      { id: 'SG', name: 'Singapore', lat: 1.4159, lng: 103.766449, count: 16 },
      {
         id: 'MY',
         name: 'Malaysia',
         lat: 1.481218,
         lng: 103.444205,
         count: 360,
      },
      {
         id: 'ID',
         name: 'Indonesia',
         lat: 1.05218,
         lng: 104.144205,
         count: 1427,
      },
   ],
}

const Map = ({ setAddress }) => {
   const [center, setCenter] = useState({
      lat: defaultProps.center.lat,
      lng: defaultProps.center.lng,
   })
   const [lat, setLat] = useState(defaultProps.center.lat)
   const [lng, setLng] = useState(defaultProps.center.lng)
   const [zoom, setZoom] = useState(defaultProps.zoom)
   const [places, setPlaces] = useState([])
   const [draggable, setDraggable] = useState(true)
   const [mapApi, setMapApi] = useState()
   const [mapInstance, setMapInstance] = useState()
   const [mapApiLoaded, setMapApiLoaded] = useState(false)

   const apiHasLoaded = (map, maps) => {
      setMapApi(maps)
      setMapInstance(map)
      setMapApiLoaded(true)

      _generateAddress()

      if ('geolocation' in navigator) {
         navigator.geolocation.getCurrentPosition((position) => {
            setCenter([position.coords.latitude, position.coords.longitude])
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
         })
      }
   }

   const onMarkerInteraction = (childKey, childProps, mouse) => {
      setDraggable(false)
      setLat(mouse.lat)
      setLng(mouse.lng)
   }
   const onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
      setDraggable(true)
      _generateAddress()
   }

   const _onChange = ({ center, zoom }) => {
      setCenter(center)
      setZoom(zoom)
      console.log('onchange')
      _generateAddress()
   }

   const _onClick = (value) => {
      setLat(value.lat)
      setLng(value.lng)
      setCenter({ lat: value.lat, lng: value.lng })
      _generateAddress()
   }

   const addPlace = (place) => {
      if (place) {
         setPlaces([place])
         setLat(place.geometry.location.lat())
         setLng(place.geometry.location.lng())

         _generateAddress()
      }
   }

   const _generateAddress = () => {
      if (mapApiLoaded) {
         const geocoder = new mapApi.Geocoder()

         geocoder.geocode(
            { location: { lat: lat, lng: lng } },
            (results, status) => {
               if (status === 'OK') {
                  if (results[results.length - 1]) {
                     setAddress(results[results.length - 1].formatted_address)
                  } else {
                     window.alert('No results found')
                  }
               } else if (status === 'OVER_QUERY_LIMIT') {
                  setTimeout(function () {
                     _generateAddress()
                  }, 300)
               } else {
                  window.alert('Geocoder failed due to: ' + status)
               }
            }
         )
      }
   }

   return (
      <Box>
         <Box>
            {process.env.REACT_APP_GOOGLE_MAPS_API && (
               <Wrapper>
                  <GoogleMapReact
                     bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLE_MAPS_API,
                        libraries: ['places', 'geometry'],
                     }}
                     options={mapOptions}
                     center={center}
                     zoom={zoom}
                     draggable={draggable}
                     onChange={_onChange}
                     onChildMouseDown={onMarkerInteraction}
                     onChildMouseUp={onMarkerInteractionMouseUp}
                     onChildMouseMove={onMarkerInteraction}
                     yesIWantToUseGoogleMapApiInternals
                     onGoogleApiLoaded={({ map, maps }) =>
                        apiHasLoaded(map, maps)
                     }
                     onClick={_onClick}
                  >
                     {/* <Marker text={address} lat={lat} lng={lng} /> */}
                     {defaultProps.hotspots.map((country) => (
                        <CountryHotspot {...country} key={country.id} />
                     ))}
                  </GoogleMapReact>
               </Wrapper>
            )}
         </Box>

         {/* <AutoComplete map={mapInstance} mapApi={mapApi} addPlace={addPlace} /> */}

         {/* <div className="info-wrapper">
            <div className="map-details">
               Latitude: <span>{lat}</span>, Longitude: <span>{lng}</span>
            </div>
            <div className="map-details">
               Zoom: <span>{zoom}</span>
            </div>
            <div className="map-details">
               Address: <span>{address}</span>
            </div>
         </div> */}
      </Box>
   )
}

const mapOptions = {
   styles: [
      {
         featureType: 'administrative',
         elementType: 'all',
         stylers: [
            {
               hue: '#000000',
            },
            {
               lightness: -100,
            },
            {
               visibility: 'off',
            },
         ],
      },
      {
         featureType: 'administrative',
         elementType: 'labels',
         stylers: [
            {
               visibility: 'simplified',
            },
         ],
      },
      {
         featureType: 'administrative.country',
         elementType: 'labels',
         stylers: [
            {
               lightness: '19',
            },
            {
               visibility: 'simplified',
            },
         ],
      },
      {
         featureType: 'administrative.province',
         elementType: 'labels',
         stylers: [
            {
               visibility: 'simplified',
            },
         ],
      },
      {
         featureType: 'landscape',
         elementType: 'geometry',
         stylers: [
            {
               hue: '#ff0000',
            },
            {
               saturation: -100,
            },
            {
               lightness: -3,
            },
            {
               visibility: 'simplified',
            },
         ],
      },
      {
         featureType: 'landscape',
         elementType: 'labels',
         stylers: [
            {
               hue: '#ff0000',
            },
            {
               saturation: -100,
            },
            {
               lightness: -100,
            },
            {
               visibility: 'off',
            },
         ],
      },
      {
         featureType: 'poi',
         elementType: 'all',
         stylers: [
            {
               saturation: -100,
            },
            {
               lightness: -100,
            },
            {
               visibility: 'off',
            },
         ],
      },
      {
         featureType: 'poi.attraction',
         elementType: 'labels',
         stylers: [
            {
               visibility: 'simplified',
            },
         ],
      },
      {
         featureType: 'road',
         elementType: 'geometry',
         stylers: [
            {
               hue: '#bbbbbb',
            },
            {
               saturation: -100,
            },
            {
               lightness: 26,
            },
            {
               visibility: 'on',
            },
         ],
      },
      {
         featureType: 'road',
         elementType: 'labels',
         stylers: [
            {
               hue: '#ffffff',
            },
            {
               saturation: -100,
            },
            {
               lightness: 100,
            },
            {
               visibility: 'off',
            },
         ],
      },
      {
         featureType: 'road.local',
         elementType: 'all',
         stylers: [
            {
               hue: '#ffffff',
            },
            {
               saturation: -100,
            },
            {
               lightness: 100,
            },
            {
               visibility: 'on',
            },
         ],
      },
      {
         featureType: 'transit',
         elementType: 'labels',
         stylers: [
            {
               hue: '#000000',
            },
            {
               lightness: -100,
            },
            {
               visibility: 'off',
            },
         ],
      },
      {
         featureType: 'water',
         elementType: 'geometry',
         stylers: [
            {
               hue: '#ffffff',
            },
            {
               saturation: -100,
            },
            {
               lightness: 100,
            },
            {
               visibility: 'on',
            },
         ],
      },
      {
         featureType: 'water',
         elementType: 'labels',
         stylers: [
            {
               hue: '#000000',
            },
            {
               saturation: -100,
            },
            {
               lightness: -100,
            },
            {
               visibility: 'off',
            },
         ],
      },
   ],
}

export default Map
