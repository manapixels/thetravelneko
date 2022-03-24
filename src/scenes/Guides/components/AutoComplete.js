// Autocomplete.js
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
   position: relative;
   align-items: center;
   justify-content: center;
   width: 100%;
   padding: 20px;
   text-align: center;
`

const AutoComplete = ({ map, mapApi, addPlace }) => {
   const [input, setInput] = useState('')
   const searchInputRef = useRef(null)
   const [autoComplete, setAutoComplete] = useState()

   useEffect(() => {
      const options = {
         // restrict your search to a specific type of result
         types: ['address'],
         // restrict your search to a specific country, or an array of countries
         // componentRestrictions: { country: ['gb', 'us'] },
      }
      if (mapApi) {
         let _autoComplete = new mapApi.places.Autocomplete(searchInputRef, options)
         _autoComplete.addListener('place_changed', onPlaceChanged(_autoComplete))
         _autoComplete.bindTo('bounds', map)

      }

      return () => {
         if (mapApi) {
            mapApi.event.clearInstanceListeners(searchInputRef)
         }
      }
   }, [mapApi])

   const onPlaceChanged = (_autoComplete) => {
      const place = _autoComplete.getPlace()

      if (place) {

      if (!place.geometry) return
      if (place.geometry.viewport) {
         map.fitBounds(place.geometry.viewport)
      } else {
         map.setCenter(place.geometry.location)
         map.setZoom(17)
      }
    }

      addPlace(place)
      searchInputRef.current.blur()
   }

   const clearSearchBox = () => {
      setInput('')
   }

   return (
      <Wrapper>
         <input
            className="search-input"
            ref={searchInputRef}
            type="text"
            value={input}
            onFocus={() => clearSearchBox()}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a location"
         />
      </Wrapper>
   )
}

export default AutoComplete
