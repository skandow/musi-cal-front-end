import React, {useState} from 'react'
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

export default function EditSearch(props) {
    const [address, setAddress] = useState(props.address)
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete()
    function makeChange(event) {
        setAddress(event.target.value)
        setValue(event.target.value)
    }
    return <Combobox onSelect={ async (address) => {
        setAddress(address)
        setValue(address, false);
        clearSuggestions()
        try {
            const results = await getGeocode({address})
            const { lat, lng } = await getLatLng(results[0])
            props.handlePlaceSelection(address, lat, lng)
        } catch(error) {
            console.log("error!")
        }}}>
        <ComboboxInput id="edit-location-address" value={address} onChange={makeChange} disabled={!ready} placeholder="Enter an address" />
        <ComboboxPopover>
            <ComboboxList>
            {status === "OK" && 
                data.map(({place_id, description}) => {
                    return (<ComboboxOption key={place_id} value={description} />)})}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>
}