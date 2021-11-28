import { Typography, Container, Stack, Paper, Button, IconButton, TextField, Grid, Select, MenuItem } from '@mui/material';
import React from 'react';
import useStyles from '../restaurant-styles';
import EditIcon from '@mui/icons-material/Edit';
import MenuChip from '../../../GlobalComponents/Chips';

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

class RestaurantEmail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{backgroundColor: "#eee"}}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{fontWeight: "bold"}}>
                        Email:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="p">
                                {this.props.restaurant.email}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        );
    }
}

class RestaurantPhone extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            phoneValue: props.restaurant.name,
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
            phoneValue: this.props.restaurant.phone,
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
                        Phone:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                        {!this.state.editable &&
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="p">
                                    {this.props.restaurant.phone}
                                </Typography>
                                <IconButton onClick={this.toggleEdit.bind(this)}>
                                    <EditIcon style={{fontSize: "medium"}}/>
                                </IconButton>
                            </Stack>
                        }
                        {this.state.editable &&
                            <Stack direction="row" spacing={1}>
                                <TextField value={this.state.phoneValue}
                                    variant="outlined"
                                    size="small"
                                    label="Phone Number"
                                    onChange={(e) => {this.setState({phoneValue: e.target.value,})}}
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


class RestaurantWebsite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            websiteValue: props.restaurant.url,
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
            websiteValue: this.props.restaurant.url,
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
                        Website:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                        {!this.state.editable &&
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="p">
                                    {this.props.restaurant.url}
                                </Typography>
                                <IconButton onClick={this.toggleEdit.bind(this)}>
                                    <EditIcon style={{fontSize: "medium"}}/>
                                </IconButton>
                            </Stack>
                        }
                        {this.state.editable &&
                            <Stack direction="row" spacing={1}>
                                <TextField value={this.state.websiteValue}
                                    variant="outlined"
                                    size="small"
                                    label="Website URL"
                                    onChange={(e) => {this.setState({websiteValue: e.target.value,})}}
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

class RestaurantWaitTime extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editable: false,
            avgWaitSelection: this.props.restaurant.avgTimePerCustomer,
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
            <Paper className={this.props.classes.lineEntry} style={{backgroundColor: "#eee"}}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{fontWeight: "bold"}}>
                        Average wait time per customer:
                    </Typography>
                    {!this.state.editable &&
                        <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                            <Typography variant="p">
                                {this.props.restaurant.avgTimePerCustomer + " minutes"}
                            </Typography>
                            <IconButton onClick={this.toggleEdit.bind(this)}>
                                <EditIcon style={{fontSize: "medium"}}/>
                            </IconButton>
                        </Stack>
                    }
                    {this.state.editable &&
                        <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                            <Select value={this.state.avgWaitSelection}
                                variant="outlined"
                                size="small"
                                label="Description"
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
                            <Button variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
                            <Button variant="contained" style={{backgroundColor: "darkRed"}}
                                    onClick={this.handleCancel.bind(this)}>Cancel</Button>
                        </Stack>
                    }
                </Stack>
            </Paper>
        );
    }
}

class RestaurantTags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedChips: this.props.restaurant.chips,
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
            <Paper className={this.props.classes.lineEntry} style={{backgroundColor: "#eee"}}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{fontWeight: "bold"}}>
                        Restaurant Tags:
                    </Typography>
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
                            <RestaurantEmail classes={classes} restaurant={props.restaurant}/>
                            <RestaurantPhone classes={classes} restaurant={props.restaurant}/>
                            <RestaurantWebsite classes={classes} restaurant={props.restaurant}/>
                            <RestaurantHours restaurant={props.restaurant} classes={classes}/>
                            <RestaurantWaitTime restaurant={props.restaurant} classes={classes}/>
                            <RestaurantTags restaurant={props.restaurant} classes={classes}/>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </div>
    )
}

export default SettingsDisplay;
