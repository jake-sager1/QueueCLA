import React from "react";
import { Paper, Container, Stack, Typography, Box, Button, Avatar } from "@mui/material";
import useStyles from '../restaurant-styles';

function LineStatus(props) {

    const classes = useStyles();

    return (
        <div className={classes.mainPage}>
            <Container maxWidth="md">
                <Stack direction="column" spacing={3}>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <Avatar className={classes.avatar} 
                            sx={{width: 100, height: 100}}
                            src={props.restaurant.profileImage}/>
                        <Typography variant="h3">
                            {props.restaurant.name} Line
                        </Typography>
                    </Stack>
                    <Paper className={classes.lineStatusHeader}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h4" style={{fontWeight: "bold"}}>
                                Line Status:&nbsp;
                                <Box component="span" style={props.restaurant.waitEnabled ? 
                                {color: "darkGreen"} : {color: "darkRed"}}>
                                    {props.restaurant.waitEnabled ? "Enabled" : "Disabled"}
                                </Box>
                            </Typography>
                            <Button variant="contained" style={props.restaurant.waitEnabled ? 
                                {backgroundColor: "darkRed"} : {backgroundColor: "darkGreen"}}>
                                {props.restaurant.waitEnabled ? "Disable " : "Enable "}
                                Line
                             </Button>
                        </Stack>
                    </Paper>
                    <Paper className={classes.lineStatusHeader}
                            style={props.restaurant.waitEnabled ? 
                            {display: "block"} : {display: "none"}}>
                        <Stack direction="column" spacing={2}>
                            <Stack direction="row" justifyContent="flex-start">
                                <Typography variant="h4">
                                    Customers in line:
                                </Typography>
                            </Stack>
                            <Stack direction="column" spacing={2}>
                                <Paper className={classes.lineEntry} style={{backgroundColor: "#ccc"}}>
                                        <Stack direction="row" alignItems="center" justifyContent="flex-start">
                                            <Typography variant="h6" style={{width: "100px", fontWeight: "bold"}}>
                                                UID
                                            </Typography>
                                            &nbsp;
                                            <Typography variant="h6" style={{fontWeight: "bold"}}>
                                                Name
                                            </Typography>
                                     </Stack>
                                    </Paper>
                                {props.restaurant.waitlist.map((id) => 
                                    <Paper className={classes.lineEntry} style={{backgroundColor: "#eee"}}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center" >
                                                <Typography variant="p" style={{width: "100px"}}>
                                                    {id}
                                                </Typography>
                                                &nbsp;
                                                <Typography variant="h6">
                                                    {props.users[id].name}&nbsp;
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" alignItems="flex-end" spacing={1}>
                                                <Button variant="contained">Seat Customer</Button>
                                                <Button variant="contained" style={{backgroundColor: "darkRed"}}>Not Present</Button>
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                )}
                            </Stack>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </div>
    );
}

export default LineStatus;