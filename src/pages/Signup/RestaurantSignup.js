import { Typography, Container, Stack, Paper, Button, IconButton, TextField, Grid, Select, MenuItem } from '@mui/material';
import React from 'react';
import useStyles from '../Restaurant/restaurant-styles';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box'
import MenuChip from '../../../src/GlobalComponents/Chips';
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import { spacing } from '@mui/system';

class RestaurantRegister extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: true,
            nameFieldValue: props.restaurant.name,
        }
    }

    toggleEdit() {
        if(this.state.editable)
        {
            this.setState({
                editable: false,
            });
        } else {
            this.setState({
                editable: true,
            });
        }
    }

    handleCancel() {
        this.toggleEdit();
        this.setState({
            nameFieldValue: this.props.restaurant.name,
        })
    }

    handleSave() {
        this.toggleEdit();
    }

    render() {
        return (
            <Paper style={{backgroundColor: "#FFF"}}>
                <Stack direction="column" spacing={3}>
                    <TextField sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }, }} id="outlined-error" label="Restaurant Name" variant="outlined" />
                    <TextField spacing={3} id="outlined-multiline-static" rows={2} label="Description" variant="outlined"/>
                    <RestaurantHours restaurant={this.props.restaurant} classes={this.classes}/>
                    <RestaurantWaitTime restaurant={this.props.restaurant} classes={this.classes}/>
                    <RestaurantTags restaurant={this.props.restaurant} classes={this.classes}/>
                </Stack>
                <Button align="center" variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
            </Paper>
        );
    }
}

class HourEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            openTimeSelection: '8:00',
            openTimeHalf: 'am',
            closeTimeSelection: '8:00',
            closeTimeHalf: 'pm',
        }
    }

    timeOptions = [
        "12:00",
        "12:30",
        "1:00",
        "1:30",
        "2:00",
        "2:30",
        "3:00",
        "3:30",
        "4:00",
        "4:30",
        "5:00",
        "5:30",
        "6:00",
        "6:30",
        "7:00",
        "7:30",
        "8:00",
        "8:30",
        "9:00",
        "9:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
    ]

    toggleEdit() {
        if(this.state.editable) {
            this.setState({editable: false});
        } else {
            this.setState({editable: true});
        }
    }

    handleCancel() {
        this.setState({
            editable: false,
            openTimeSelection: this.props.restaurant.hours[this.props.day].open,
            openTimeHalf: this.props.restaurant.hours[this.props.day].openHalf,
            closeTimeSelection: this.props.restaurant.hours[this.props.day].close,
            closeTimeHalf: this.props.restaurant.hours[this.props.day].closeHalf,
        })
    }

    handleSave() {
        this.toggleEdit();
    }

    handleOpenChange(val) {
        this.setState({
            openTimeSelection: val,
        })
    }

    handleOpenHalfChange(val) {
        this.setState({
            openTimeHalf: val,
        })
    }
    
    handleCloseChange(val) {
        this.setState({
            closeTimeSelection: val,
        })
    }

    handleCloseHalfChange(val) {
        this.setState({
            closeTimeHalf: val,
        })
    }

    render() {
        return (
            <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}> 
                <Typography variant="p" style={{width: "110px"}}>
                    {this.props.day + ":"}
                </Typography>
                <Stack direction="column" spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography>Open:</Typography>
                        <Select size="small" value={this.state.openTimeSelection}
                                onChange={(event) => this.handleOpenChange(event.target.value)}>
                            {this.timeOptions.map((time) => (
                                <MenuItem value={time}>{time}</MenuItem>
                            ))}
                        </Select>
                        <Select size="small" value={this.state.openTimeHalf}
                                onChange={(event) => this.handleOpenHalfChange(event.target.value)}>
                                <MenuItem value="am">am</MenuItem>
                                <MenuItem value="pm">pm</MenuItem>
                        </Select>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography>Close:</Typography>
                        <Select size="small" value={this.state.closeTimeSelection}
                                onChange={(event) => this.handleCloseChange(event.target.value)}>
                            {this.timeOptions.map((time) => (
                                <MenuItem value={time}>{time}</MenuItem>
                            ))}
                        </Select>
                        <Select size="small" value={this.state.closeTimeHalf}
                                onChange={(event) => this.handleCloseHalfChange(event.target.value)}>
                                <MenuItem value="am">am</MenuItem>
                                <MenuItem value="pm">pm</MenuItem>
                        </Select>
                    </Stack>
                </Stack>
            </Stack> 
        );
    }
}

class RestaurantHours extends React.Component {
    render() {
        return (
            <Paper style={{backgroundColor: "#FFF"}}>
                <Stack direction="column" spacing={1}>  
                    <Typography variant="h6" style={{fontWeight: "bold"}}>
                        Hours
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                        <Stack direction="column" spacing={1}>
                            <HourEntry day={'Monday'}/>
                            <HourEntry day={'Tuesday'}/>
                            <HourEntry day={'Wednesday'}/>
                            <HourEntry day={'Thursday'}/>
                            <HourEntry day={'Friday'}/>
                            <HourEntry day={'Saturday'}/>
                            <HourEntry day={'Sunday'}/>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        );
    }
}

class RestaurantWaitTime extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editable: true,
            avgWaitSelection: '3',
        }
    }

    toggleEdit() {
        if(!this.state.editable) {
            this.setState({editable: true});
        } else {
            this.setState({editable: false});
        }
    }

    handleSave() {
        this.toggleEdit();
    }

    handleCancel() {
        this.toggleEdit();
        this.setState({
            avgWaitSelection: this.props.restaurant.avgTimePerCustomer,
        });
    }

    render() {
        return (
            <div>
                <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                <Typography spacing={3} variant="p">Average Wait Time per Customer</Typography>
                    <Select value={this.state.avgWaitSelection} 
                        variant="outlined" 
                        size="small" 
                        label="Average Wait Time Per Customer"
                        style={{width: "150px",}}
                        onChange={(e) => {this.setState({avgWaitSelection: e.target.value,})}}
                        >
                        <MenuItem value={0.25}>15 seconds</MenuItem>
                        <MenuItem value={0.5}>30 seconds</MenuItem>
                        <MenuItem value={1}>1 minute</MenuItem>
                        <MenuItem value={2}>2 minutes</MenuItem>
                        <MenuItem value={3}>3 minutes</MenuItem>
                        <MenuItem value={4}>4 minutes</MenuItem>
                        <MenuItem value={5}>5 minutes</MenuItem>
                        <MenuItem value={10}>10 minutes</MenuItem>
                        <MenuItem value={15}>15 minutes</MenuItem>
                        <MenuItem value={20}>20 minutes</MenuItem>
                        <MenuItem value={25}>25 minutes</MenuItem>
                        <MenuItem value={30}>30 minutes</MenuItem>
                        <MenuItem value={45}>45 minutes</MenuItem>
                        <MenuItem value={60}>1 hour</MenuItem>
                    </Select>
                </Stack>
            </div>
        );
    }
}

class RestaurantTags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedChips: "vegan",
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
        return (
            <Stack direction="column" spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                    <Stack spacing={1} alignItems="center" direction="row" justifyContent="flex-start"
                        style={{overflow: "scroll"}}>
                        {this.chips.map((name) => 
                                <MenuChip name={name} 
                                onClick={() => this.handleClick(name)}
                                variant={this.state.selectedChips.includes(name) ? "filled" : "outlined"}/>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        );
    }
}

function RestaurantSignup(props) {

    const classes = useStyles();
    
    let editName = false;
    
    return (
        <div class={classes.mainPage}>
            <Header/>
            <Container maxWidth="md">
                <Stack direction="column" spacing={2}>
                    <Paper className={classes.settingsPaper}>
                        <Box m={2} pt={3}>
                            <Typography spacing="5" variant="h5" style={{fontWeight: "bold"}}>Register Your Restaurant</Typography>
                            <Stack direction="column" spacing={5} sx={{ mb: 3 }}>
                                <RestaurantRegister restaurant={props.restaurant} classes={classes}/>
                            </Stack>
                        </Box>
                    </Paper>
                </Stack>
            </Container>
            <Footer/>
        </div>
    )
}

export default RestaurantSignup;