import React from "react";
import { Stack, Autocomplete, TextField, InputAdornment, IconButton } from '@mui/material';
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Redirect } from "react-router";

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: null,
      submitSearch: false,
    }
  }

  handleChange(e) {
    this.setState({
      searchValue: e.target.value,
      submitSearch: false,
    });
  }

  handleKeyPress(e) {
    if(e.keyCode == 13)
    {
      this.submitSearch();
    }
  }

  submitSearch() {
    this.setState({submitSearch: true,});
  }

  render() {
      return (
        <Box>
          <TextField label="Search for restaurants" fullWidth
              InputProps={{
                type: 'search',
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.submitSearch.bind(this)}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                )}}
              size="small"
              onKeyDown={(e) => this.handleKeyPress(e)}
              onChange={(e) => this.handleChange(e)}
            />
            {this.state.submitSearch &&
              <Redirect to={"/search/" + this.state.searchValue}/>
            }
        </Box>
      );
  }
}
  

export default SearchBar;