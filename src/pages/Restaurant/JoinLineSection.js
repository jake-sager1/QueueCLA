import React from "react";
import { Paper, Stack, Typography, Box, Button } from '@mui/material';
import useStyles from "./restaurant-styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function JoinLineSection(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (props.user.inLine) {
            setOpen(true);
            return;
        }
        //change user data to add restaurant to user's restaurantID 
        let userChange = {
            restaurantID: {
                id: props.restaurant.id,
                name: props.restaurant.name
            },
            inLine: true
        };

        let restaurantWaitlist = props.restaurant.waitlist;
        restaurantWaitlist.push(
            {
                uid: props.user.uid,
                name: props.user.name,
                id: props.user.id
            }
        );

        let restaurantChange = {
            waitlist: restaurantWaitlist
        };

        editUser(props.user.id, userChange).then(() => {
            props.changeUserData(userChange);
        });

        editRestaurant(props.restaurant.id, restaurantChange).then(() => {
            props.changeRestaurantData(props.restaurant.id, restaurantChange);
        })

    };

    const handleClose = () => {
        setOpen(false);
    };

    let currentSpotInLine = 1;

    if (props.user.inLine && props.user.restaurantID.id === props.restaurant.id) {
        for (let i = 0; i < props.restaurant.waitlist.length; i++) {
            if (props.restaurant.waitlist[i].id === props.user.id) {
                currentSpotInLine = i + 1;
            }
        }
    }

    if (props.restaurant.waitEnabled) {
        return (

            <Stack direction="column" spacing={2}>
                <Typography variant="h4">
                    {(!props.user.inLine || (props.user.inLine && props.user.restaurantID.id !== props.restaurant.id)) &&
                        "Join the Line"
                    }
                    {props.user.inLine && props.user.restaurantID.id === props.restaurant.id &&
                        "You're in line!"
                    }
                    {(props.user.inLine && props.user.isSeated ) ? (
                        <Stack direction="row" justifyContent="space-between">
                            You've been seated!
                            <Button variant="contained" style={{ backgroundColor: "darkRed"}}>
                                Dismiss
                            </Button>
                        </Stack>
                    ) : (<span></span>)
                    }
                    {props.user.isRemoved ? (
                        <Stack direction="row" justifyContent="space-between">
                            You've been removed from line.
                            <Button variant="contained" style={{ backgroundColor: "darkRed"}}>
                                Dismiss
                            </Button>
                        </Stack>
                    ) : (<span></span>)}
                </Typography>
                {!(props.user.inLine && props.user.restaurantID.id === props.restaurant.id) &&
                    <Stack direction="column" spacing={2}>
                        <Typography>
                            {"There are currently "}
                            <Box component="span" display="inline" style={{ fontWeight: "bold" }}>
                                {props.restaurant.waitlist.length}
                            </Box>
                            {" people in line right now."}
                        </Typography>
                        <Typography>
                            {"Approximate wait time: "}
                            <Box component="span" display="inline" style={{ fontWeight: "bold" }}>
                                {props.user.inLine && props.user.restaurantID.id === props.restaurant.id ?
                                    props.restaurant.avgTimePerCustomer * props.restaurant.waitlist.length :
                                    props.restaurant.avgTimePerCustomer * (props.restaurant.waitlist.length + 1)} minutes
                            </Box>
                        </Typography>
                        <Button variant="contained" style={{ padding: "20px" }} onClick={handleClickOpen}>Get in Line</Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"You're Already in Line"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    You are currently already in line at {props.user.restaurantID.name}.
                                    Please leave line to join another.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} autoFocus>Okay</Button>
                            </DialogActions>
                        </Dialog>
                    </Stack>
                }
                {props.user.inLine && props.user.restaurantID.id == props.restaurant.id &&
                    <Stack direction="column" spacing={2}>
                        <Typography>
                            {"You are number "}
                            <Box component="span" display="inline" style={{ fontWeight: "bold" }}>
                                {currentSpotInLine + " of " + props.restaurant.waitlist.length}
                            </Box>
                            {" in line at " + props.restaurant.name + "."}
                        </Typography>
                        <Typography>
                            {"Approximate wait time remaining: "}
                            <Box component="span" display="inline" style={{ fontWeight: "bold" }}>
                                {props.restaurant.avgTimePerCustomer * currentSpotInLine} minutes
                            </Box>
                        </Typography>
                        <Button variant="contained" style={{ backgroundColor: "darkRed" }} onClick={
                            () => {
                                //change the user
                                let userChange = {
                                    restaurantID: {},
                                    inLine: false
                                };

                                let restaurantWaitlist = props.restaurant.waitlist;
                                let indexToRemove;
                                for (let i = 0; i < restaurantWaitlist.length; i++) {
                                    if (restaurantWaitlist[i].id === props.user.id) {
                                        indexToRemove = i;
                                        console.log("hey");
                                    }
                                }
                                console.log(indexToRemove);
                                restaurantWaitlist.splice(indexToRemove, 1);
                                let restaurantChange = {
                                    waitlist: restaurantWaitlist
                                };
                                editUser(props.user.id, userChange).then(() => {
                                    props.changeUserData(userChange);
                                });

                                editRestaurant(props.restaurant.id, restaurantChange).then(() => {
                                    props.changeRestaurantData(props.restaurant.id, restaurantChange);
                                });
                            }
                        }>Leave the line</Button>
                    </Stack>
                }



            </Stack >

        );
    } else {
        return (

            <Stack direction="column" spacing={2}>
                <Typography variant="h4">
                    Virtual Line Not Available
                </Typography>
                <Typography>
                    The virtual queue is currently disabled.&nbsp;
                    {props.restaurant.name} might be closed, or there is
                    currently no wait to eat at the restaurant. Contact the
                    restaurant using the information below.
                </Typography>
            </Stack>

        );
    }


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
    fetch('http://localhost:5001/user/edit', requestOptions)
        .then(response => response.json())
        .then(data => { console.log(data) });
}

async function editRestaurant(id, editProps) {
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


export default JoinLineSection;