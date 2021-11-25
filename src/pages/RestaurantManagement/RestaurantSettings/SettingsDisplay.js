import { Typography, Container, Stack, Paper, Button, IconButton, TextField, Box, Select, MenuItem } from '@mui/material';
import React from 'react';
import useStyles from '../restaurant-styles';
import EditIcon from '@mui/icons-material/Edit';

class RestaurantName extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
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
            <Paper className={this.props.classes.lineEntry} style={{backgroundColor: "#eee"}}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{fontWeight: "bold"}}>
                        Name:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                        {!this.state.editable &&
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="p">
                                    {this.props.restaurant.name}
                                </Typography>
                                <IconButton onClick={this.toggleEdit.bind(this)}>
                                    <EditIcon style={{fontSize: "medium"}}/>
                                </IconButton>
                            </Stack>
                        }
                        {this.state.editable &&
                            <Stack direction="row" spacing={1}>
                                <TextField value={this.state.nameFieldValue} 
                                    variant="outlined" 
                                    size="small" 
                                    label="Name"
                                    onChange={(e) => {this.setState({nameFieldValue: e.target.value,})}}
                                    />
                                <Button variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
                                <Button variant="contained" style={{backgroundColor: "darkRed"}}
                                        onClick={this.handleCancel.bind(this)}>Cancel</Button>
                            </Stack>
                        }
                    </Stack>
                </Stack>
            </Paper>
        );
    }
}

class RestaurantDescription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            descriptionFieldValue: props.restaurant.description,
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
            descriptionFieldValue: this.props.restaurant.description,
        });
    }

    handleSave() {
        this.toggleEdit();
    }

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{backgroundColor: "#eee"}}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{fontWeight: "bold"}}>
                        Description:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                        {!this.state.editable &&
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="p">
                                    {this.props.restaurant.description}
                                </Typography>
                                <IconButton onClick={this.toggleEdit.bind(this)}>
                                    <EditIcon style={{fontSize: "medium"}}/>
                                </IconButton>
                            </Stack>
                        }
                        {this.state.editable &&
                            <Stack direction="row" spacing={1}>
                                <TextField value={this.state.descriptionFieldValue} 
                                    variant="outlined" 
                                    size="small" 
                                    label="Description"
                                    style={{width: "400px",}}
                                    onChange={(e) => {this.setState({descriptionFieldValue: e.target.value,})}}
                                    />
                                <Button variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
                                <Button variant="contained" style={{backgroundColor: "darkRed"}}
                                        onClick={this.handleCancel.bind(this)}>Cancel</Button>
                            </Stack>
                        }
                    </Stack>
                </Stack>
            </Paper>
        );
    }
}

class HourEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            openTimeSelection: this.props.restaurant.hours[this.props.day].open,
            openTimeHalf: this.props.restaurant.hours[this.props.day].openHalf,
            closeTimeSelection: this.props.restaurant.hours[this.props.day].close,
            closeTimeHalf: this.props.restaurant.hours[this.props.day].closeHalf,
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
                {!this.state.editable &&
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="p">
                            {this.props.restaurant.hours[this.props.day].open + 
                            this.props.restaurant.hours[this.props.day].openHalf + 
                            " - " + 
                            this.props.restaurant.hours[this.props.day].close +
                            this.props.restaurant.hours[this.props.day].closeHalf}
                        </Typography>
                        <IconButton onClick={this.toggleEdit.bind(this)}>
                            <EditIcon style={{fontSize: "medium"}}/>
                        </IconButton>
                    </Stack>
                }  
                {this.state.editable &&
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
                        <Button variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
                        <Button variant="contained" style={{backgroundColor: "darkRed"}}
                                onClick={this.handleCancel.bind(this)}>Cancel</Button>
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
                }
            </Stack> 
        );
    }
}

class RestaurantHours extends React.Component {

    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{backgroundColor: "#eee"}}>
                <Stack direction="column" spacing={1}>  
                    <Typography variant="h5" style={{fontWeight: "bold"}}>
                        Hours:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                        <Stack direction="column" spacing={1}>
                            {Object.keys(this.props.restaurant.hours).map((day) => (
                                <HourEntry key={day} day={day} restaurant={this.props.restaurant}/> 
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        );
    }
}

function SettingsDisplay(props) {

    const classes = useStyles();
    
    let editName = false;
    
    return (
        <div class={classes.mainPage}>
            <Container maxWidth="md">
                <Stack direction="column" spacing={2}>
                    <Typography variant="h3">{props.restaurant.name} Settings</Typography>
                    <Paper className={classes.settingsPaper}>
                        <Stack direction="column" spacing={2}>
                            <RestaurantName restaurant={props.restaurant} classes={classes}/>
                            <RestaurantDescription restaurant={props.restaurant} classes={classes}/>
                            <RestaurantHours restaurant={props.restaurant} classes={classes}/>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </div>
    )
}

export default SettingsDisplay;