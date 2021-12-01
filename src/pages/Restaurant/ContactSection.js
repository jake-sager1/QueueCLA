import React from "react";
import { Paper, Stack, Typography, Box, Button } from '@mui/material';
import useStyles from "./restaurant-styles";

function ContactSection(props) {

    const classes = useStyles();

    let parsedUrl = "";
    // parse url
    if (props.restaurant.url.startsWith("http://") || 
        props.restaurant.url.startsWith("https://")) {
            parsedUrl = props.restaurant.url;
    } else {
        parsedUrl = "//" + props.restaurant.url;
    }

    return (
        <Stack direction="column" spacing={2}>
            <Typography variant="h5">
                Contact
            </Typography>
            <Typography>
                <Box component="span" display="inline" style={{fontWeight: "bold"}}>
                    Phone:&nbsp;
                </Box>
                {props.restaurant.phone}
            </Typography>
            <Typography>
                <Box component="span" display="inline" style={{fontWeight: "bold"}}>
                    Website:&nbsp;
                </Box>
                <a style={{color: "black"}} href={parsedUrl}>{props.restaurant.url}</a>
            </Typography>
        </Stack>
    )
}

export default ContactSection;