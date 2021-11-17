import React from "react";
import { Stack, Autocomplete, TextField } from '@mui/material';

function SearchBar(props) {

    return (
        
      <Autocomplete
        style={{"width": "100%", "maxWidth":"300px"}}
        id="free-solo-demo"
        freeSolo
        disableClearable
        options={props.options}
        onChange={(event, value) => {props.updateSearch(value)}}
        renderInput={(params) => 
            <TextField {...params} label="Search for restaurants" fullWidth
                InputProps={{
                 ...params.InputProps,
                 type: 'search',
                 }}
                onChange={(event) => {props.updateSearch(event.target.value)}}
             />
        }
      />
    );

}
  

export default SearchBar;