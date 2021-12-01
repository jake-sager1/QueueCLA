import React from 'react'
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import GlobalHeader from '../../GlobalComponents/GlobalHeader';
import MainSection from './MainSection';
import { Redirect } from 'react-router';
import Stack from '@mui/material/Stack';
import { Typography, Box, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, CardActionArea } from '@mui/material'
import MenuChip from '../../GlobalComponents/Chips';
import { ClassNames } from '@emotion/react';

class Restaurants extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            selectedChips: []
        }
    }

    chips = [
        "vegetarian", "vegan", "gluten-free", "breakfast", "lunch", "dinner",
        "fast-food", "takeout"
    ]

    handleClick(chip) {
        if(this.state.selectedChips.includes(chip)) {
            this.setState({
                selectedChips: this.state.selectedChips.filter(function (value, index, arr) {return arr.includes(value) && value != chip}),
            });
        } else {
            this.setState({
                selectedChips: this.state.selectedChips.concat([chip]),
            });
        }
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect exact to="/"></Redirect>;
        }
        return (
            <div style={{
                backgroundColor: "#3d3d3d",
                height: "100vh",
            }}>

                <GlobalHeader restaurants={this.props.restaurants}
                    isLoggedIn={this.props.isLoggedIn} user={this.props.user}
                />
                {/* restaurant chips */}
                <div style={{backgroundColor: "#f7f7f7", paddingTop: "10px", paddingBottom: "20px"}}>
                    <Stack direction="column" style={{padding: "10px"}}>
                        <Container maxWidth="md">
                            <Stack direction="column" spacing={2}>
                                <Stack spacing={3} direction="row" alignItems="center" style={{overflow: "scroll"}}>
                                    <Stack spacing={1} alignItems="center" direction="row" justifyContent="flex-start"
                                        style={{overflow: "scroll"}, {padding: "10px"}}>
                                        {this.chips.map((name) =>
                                                <MenuChip name={name}
                                                onClick={() => this.handleClick(name)}
                                                variant={this.state.selectedChips.includes(name) ? "filled" : "outlined"}/>
                                        )}
                                    </Stack>
                                </Stack>
                                <MainSection restaurants={this.props.restaurants} searchValue={this.state.searchValue} selectedTags={this.state.selectedChips}/>
                            </Stack>
                        </Container>
                    </Stack>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Restaurants;
