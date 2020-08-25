import React from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from 'use-places-autocomplete'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from '@reach/combobox'
import '@reach/combobox/styles.css'

export default function Search(props) {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({callbackName: "initMap"})
    return <Combobox onSelect={ async (address) => {
        setValue(address, false);
        clearSuggestions()
        try {
            const results = await getGeocode({address})
            const { lat, lng } = await getLatLng(results[0])
            props.handlePlaceSelection(address, lat, lng)
        } catch(error) {
            console.log("error!")
        }}}>
        <ComboboxInput id="new-location-address" value={value} onChange={(e) => {setValue(e.target.value)}} disabled={!ready} placeholder="Enter an address" />
        <ComboboxPopover>
            <ComboboxList>
            {status === "OK" && 
                data.map(({place_id, description}) => {
                    return (<ComboboxOption key={place_id} value={description} />)})}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>
}