import React from "react";
import { Paper, Stack, Typography, Box, Button } from '@mui/material';
import useStyles from "./restaurant-styles";

function JoinLineSection(props) {
    const classes = useStyles();
    if(props.restaurant.waitEnabled) {
        return (
            
            <Stack direction="column" spacing={2}>
                <Typography variant="h4">
                    Join the Line
                </Typography>
                <Typography>
                    {"There are currently "} 
                    <Box component="span" display="inline" style={{fontWeight: "bold"}}>55</Box> 
                    {" people in line right now."}
                </Typography>
                <Button variant="contained" style={{padding: "20px"}}>Get in Line</Button>
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