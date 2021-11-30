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
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    let currentSpotInLine = 1;

    if (props.user.inLine && props.user.restaurantID.email === props.restaurant.email) {
        for (let i = 0; i < props.restaurant.waitlist.length; i++) {
            if (props.restaurant.waitlist[i].email === props.user.email) {
                currentSpotInLine = i + 1;
            }
        }
    }

    if (props.restaurant.waitEnabled) {
        return (

            <Stack direction="column" spacing={2}>
                <Typography variant="h4">
                    {(!props.user.inLine || (props.user.inLine && props.user.restaurantID.email !== props.restaurant.email)) &&
                        "Join the Line"
                    }
                    {props.user.inLine && props.user.restaurantID.email === props.restaurant.email &&
                        "You're in line!"
                    }
                </Typography>
                {!(props.user.inLine && props.user.restaurantID.email === props.restaurant.id.email) &&
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
                                {props.restaurant.avgTimePerCustomer * props.restaurant.waitlist.length} minutes
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
                {props.user.inLine && props.user.restaurantID.email == props.restaurant.email &&
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
                        <Button variant="contained" style={{ backgroundColor: "darkRed" }}>Leave the line</Button>
                    </Stack>
                }



            </Stack>

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

export default JoinLineSection;