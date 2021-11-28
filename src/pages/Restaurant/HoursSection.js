import { ArrowDropDown, ArrowDropDownCircle } from '@mui/icons-material';
import { Hidden, IconButton, Stack, Typography } from '@mui/material';
import useStyles from './restaurant-styles';
import React from 'react';

const date = new Date();
let dayNum = date.getDay();
let day;
switch(dayNum) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
    break;
  default:
    day = "Monday";
    break;
}

function HiddenHours(props) {

    const classes = useStyles();

    return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start"
        style={{marginBottom: "15px"}} className={classes.hiddenHours}>
            <Stack direction="column" spacing={1}>
                {Object.keys(props.restaurant.hours).map((day) => (
                    <Typography>
                        {day + ":"}
                    </Typography>
                ))}
            </Stack>
            <Stack direction="column" spacing={1}>
                {Object.keys(props.restaurant.hours).map((day) => (
                    <Typography>
                        {props.restaurant.hours[day].open +
                        props.restaurant.hours[day].openHalf + 
                        " - " + props.restaurant.hours[day].close + 
                        props.restaurant.hours[day].closeHalf}
                    </Typography>
                ))}
            </Stack>
        </Stack>
    );
}

class HoursSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showHours: false,
        }
    }

    toggleHours() {
        if(this.state.showHours) {
            this.setState({
                showHours: false,
            });
        }
        else {
            this.setState({
                showHours: true,
            })
        }
    }

    render() {
        return (
            <Stack direction="column" spacing={1}> 
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    <Typography style={{fontWeight: "bold"}}>
                        {day} Hours: {this.props.restaurant.hours[day].open + 
                                        this.props.restaurant.hours[day].openHalf + 
                                        " - " + 
                                        this.props.restaurant.hours[day].close +
                                        this.props.restaurant.hours[day].closeHalf}
                    </Typography>
                    <IconButton onClick={this.toggleHours.bind(this)}>
                        <ArrowDropDownCircle/>
                    </IconButton>
                </Stack>
                {this.state.showHours &&
                    <HiddenHours restaurant={this.props.restaurant}/>
                }
            </Stack>
        );
    }
}
export default HoursSection;