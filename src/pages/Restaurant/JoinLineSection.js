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
            inLine: true,
            isSeated: false,
            isRemoved: false
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
                {((!props.user.inLine && !props.user.isSeated && !props.user.isRemoved) || (props.user.inLine && props.user.restaurantID.id !== props.restaurant.id)) &&
                     <Typography variant="h4">
                        Join the Line
                    </Typography>
                }
                {props.user.inLine && !props.user.isSeated && !props.user.isRemoved && props.user.restaurantID.id === props.restaurant.id &&
                    <Typography variant="h4">
                        {currentSpotInLine >= 3 && "You're in line!"}
                        {currentSpotInLine < 3 && "Visit the restaurant now!"}
                    </Typography>
                }
                {(props.user.inLine && props.user.isSeated && !props.user.isRemoved) &&
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h4">
                                You've been seated!
                            </Typography>
                            <Button variant="contained" style={{ backgroundColor: "darkRed" }}
                                onClick={() => {
                                    let userChange = {
                                        restaurantID: {},
                                        inLine: false,
                                        isSeated: false,
                                        isRemoved: false
                                    };
                                    editUser(props.user.id, userChange).then(() => {
                                        props.changeUserData(userChange);
                                    });
                                }}
                            >
                                Dismiss
                            </Button>
                        </Stack>
                        <Typography>
                            Check in with the host to be seated.
                        </Typography>
                    </Stack>
                }
                {props.user.isRemoved &&
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h4">
                                You've been removed from the line.
                            </Typography>
                            <Button variant="contained" style={{ backgroundColor: "darkRed" }}
                                onClick={() => {
                                    let userChange = {
                                        restaurantID: {},
                                        inLine: false,
                                        isSeated: false,
                                        isRemoved: false
                                    };
                                    editUser(props.user.id, userChange).then(() => {
                                        props.changeUserData(userChange);
                                    });
                                }}>
                                Dismiss
                            </Button>
                        </Stack>
                        <Typography>
                            Your spot was taken. Rejoin the line.
                        </Typography>
                    </Stack>
                }
                
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
                {props.user.inLine && props.user.restaurantID.id == props.restaurant.id && !props.user.isSeated && !props.user.isRemoved &&
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
                        {currentSpotInLine >= 3 &&
                            <Typography>
                                {"Be sure to visit the restaurant before you reach the front of the line, or the restaurant\
                                might remove you from their waitlist."}
                            </Typography>
                        }
                        {currentSpotInLine < 3 &&
                            <Typography>
                                {"Check in with the host now to preserve your spot in line."}
                            </Typography>
                        }
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