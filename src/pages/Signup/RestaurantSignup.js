import { Typography, Container, Stack, Paper, Button, IconButton, TextField, Grid, Select, MenuItem, Alert } from '@mui/material';
import React from 'react';
import useStyles from './signup-styles';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box'
import MenuChip from '../../../src/GlobalComponents/Chips';
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import { spacing } from '@mui/system';
import validator from 'validator';

class RestaurantRegister extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nameVal: null,
            isNameValid: true,
            descVal: null,
            isDescriptionValid: true,
            phoneVal: null,
            isPhoneValid: true,
            websiteVal: null,
            isWebsiteValid: true,
            avgWaitSelection: 3,
            selectedChips: [],
            isFormValid: false,
        }
    }

    chips = [
        "vegetarian", "vegan", "gluten-free", "breakfast", "lunch", "dinner",
        "fast-food", "takeout"
    ]

    handleClick(chip) {
        if (this.state.selectedChips.includes(chip)) {
            this.setState({
                selectedChips: this.state.selectedChips.filter(function (value, index, arr) { return arr.includes(value) && value != chip }),
            });
        } else {
            this.setState({
                selectedChips: this.state.selectedChips.concat([chip]),
            });
        }
    }

    handleSave() {
        console.log(this.state);
        let change = {
            "name": this.state.nameVal,
            "avgTimePerCustomer": this.state.avgWaitSelection,
            "description": this.state.descVal,
            "phone": this.state.phoneVal,
            "url": this.state.websiteVal,
            "chips": this.state.selectedChips,
            "setup": true
        }
        editUser(this.props.restaurant.id, change)
            .then(() => {
                this.props.changeUserData(change);
            });
    }

    checkFormValidity() {
        if (this.state.isNameValid && 
            this.state.isPhoneValid && 
            this.state.isDescriptionValid && 
            this.state.isWebsiteValid && 
            this.state.nameVal !== null && 
            this.state.descVal !== null && 
            this.state.phoneVal !== null && 
            this.state.websiteVal !== null) {
            this.setState({
                isFormValid: true
            })
        } else {
            this.setState({
                isFormValid: false
            })
        }
    }

    checkNameValidity(name) {
        if (validator.isAscii(name) && (/[a-zA-Z]/.test(name) || /\d/.test(name)) && name.length <= 50) {
            this.setState({
                isNameValid: true
            }, this.checkFormValidity)
        } else {
            this.setState({
                isNameValid: false
            }, this.checkFormValidity)
        }
    }

    checkDescriptionValidity(description) {
        if (validator.isAscii(description) && (/[a-zA-Z]/.test(description) || /\d/.test(description)) && description.length >= 10 && description.length <= 100) {
            this.setState({
                isDescriptionValid: true
            }, this.checkFormValidity)
        } else {
            this.setState({
                isDescriptionValid: false
            }, this.checkFormValidity)
        }
    }

    checkPhoneNumberValidity(phone_number) {
        if (validator.isMobilePhone(phone_number) && phone_number.length === 10) {
            this.setState({
                isPhoneValid: true
            }, this.checkFormValidity)
        } else {
            this.setState({
                isPhoneValid: false
            }, this.checkFormValidity)
        }
    }

    checkWebsiteValidity(website_url) {
        let result = website_url.match(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm)
        if (result !== null) {
            this.setState({
                isWebsiteValid: true
            }, this.checkFormValidity)
        } else {
            this.setState({
                isWebsiteValid: false
            }, this.checkFormValidity)
        }
    }

    render() {
        console.log(this.state)
        return (
            <Stack direction="column" spacing={3}>
                {
                    !this.state.isFormValid ? (
                        <Alert severity="error">Fill out all fields correctly.</Alert>
                    ) : (
                        <span></span>
                    )
                }
                <TextField 
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} 
                    id="outlined-error"
                    label="Restaurant Name"
                    variant="outlined"
                    onClick={(e) => {this.checkNameValidity(e.target.value)}}
                    onChange={(e) => { 
                        this.setState({ nameVal: e.target.value, }) 
                        this.checkNameValidity(e.target.value)
                    }}
                    error={!this.state.isNameValid}
                    helperText={this.state.isNameValid ? "" : "Please enter a valid name."}
                />
                <TextField 
                    spacing={3} 
                    id="outlined-multiline-static" 
                    rows={2} 
                    label="Description" 
                    variant="outlined"
                    onClick={(e) => {this.checkDescriptionValidity(e.target.value)}}
                    onChange={(e) => { 
                        this.setState({ descVal: e.target.value, }) 
                        this.checkDescriptionValidity(e.target.value)
                    }}
                    error={!this.state.isDescriptionValid}
                    helperText={this.state.isDescriptionValid ? "" : "Please enter a valid description."}
                />
                <TextField 
                    label="Phone Number"
                    variant="outlined"
                    onClick={(e) => {this.checkPhoneNumberValidity(e.target.value)}}
                    onChange={(e) => { 
                        this.setState({ phoneVal: e.target.value, }) 
                        this.checkPhoneNumberValidity(e.target.value)
                    }} 
                    error={!this.state.isPhoneValid}
                    helperText={this.state.isPhoneValid ? "" : "Phone number must be a 10 digit number. Ex: 4246484499"}
                />
                <TextField 
                    label="Website URL"
                    variant="outlined"
                    onClick={(e) => {this.checkWebsiteValidity(e.target.value)}}
                    onChange={(e) => { 
                        this.setState({ websiteVal: e.target.value, }) 
                        this.checkWebsiteValidity(e.target.value)
                    }}
                    error={!this.state.isWebsiteValid}
                    helperText={this.state.isWebsiteValid ? "" : "Please enter a valid website url."}
                />
                <Stack direction="column" spacing={1} alignItems="left">
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>Average Wait Time Per Customer</Typography>
                    <Select value={this.state.avgWaitSelection}
                        variant="outlined"
                        size="small"
                        label="Average Wait Time Per Customer"
                        style={{ width: "150px", }}
                        onChange={(e) => { this.setState({ avgWaitSelection: e.target.value, }) }}
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
                <Stack direction="column" spacing={1}>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        Tags
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                        <Stack spacing={1} alignItems="center" direction="row" justifyContent="flex-start"
                            style={{ overflow: "scroll" }}>
                            {this.chips.map((name) =>
                                <MenuChip name={name}
                                    onClick={() => this.handleClick(name)}
                                    variant={this.state.selectedChips.includes(name) ? "filled" : "outlined"} />
                            )}
                        </Stack>
                    </Stack>
                </Stack>
                <Button 
                    align="center"
                    variant="contained"
                    onClick={this.handleSave.bind(this)}
                    disabled={!this.state.isFormValid}
                >
                    Save
                </Button>
            </Stack>

        );
    }
}


function RestaurantSignup(props) {

    const classes = useStyles();

    return (
        <div class={classes.page}>
            <Header />
            <div class={classes.mainPage}>
                <Container maxWidth="md">
                    <Stack direction="column" spacing={2}>
                        <Paper className={classes.settingsPaper} style={{ padding: "20px" }}>
                            <Stack spacing={2} direction="column">
                                <Typography spacing="5" variant="h5" style={{ fontWeight: "bold" }}>Register Your Restaurant</Typography>
                                <Stack direction="column" spacing={5} sx={{ mb: 3 }}>
                                    <RestaurantRegister restaurant={props.restaurant} classes={classes} changeUserData={props.changeUserData} />
                                </Stack>
                            </Stack>
                        </Paper>
                    </Stack>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

async function editUser(id, editProps) {
    const body = {
        data: editProps,
        id: id
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    fetch('http://localhost:5001/restaurant/edit', requestOptions)
        .then(response => response.json())
        .then(data => { console.log(data) });
}

export default RestaurantSignup;