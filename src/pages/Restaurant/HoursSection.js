import { ArrowDropDown, ArrowDropDownCircle } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
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
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start"
                    style={{marginBottom: "15px",}}>
                        <Stack direction="column" spacing={1}>
                            {Object.keys(this.props.restaurant.hours).map((day) => (
                                <Typography>
                                    {day + ":"}
                                </Typography>
                            ))}
                        </Stack>
                        <Stack direction="column" spacing={1}>
                            {Object.keys(this.props.restaurant.hours).map((day) => (
                                <Typography>
                                    {this.props.restaurant.hours[day].open +
                                    this.props.restaurant.hours[day].openHalf + 
                                    " - " + this.props.restaurant.hours[day].close + 
                                    this.props.restaurant.hours[day].closeHalf}
                                </Typography>
                            ))}
                        </Stack>
                    </Stack>
                }
            </Stack>
        );
    }
}
export default HoursSection;