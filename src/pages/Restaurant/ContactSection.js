import React from "react";
import { Paper, Stack, Typography, Box, Button } from '@mui/material';
import useStyles from "./restaurant-styles";

function ContactSection(props) {

    const classes = useStyles();

    return (
        <Stack direction="column" spacing={2}>
            <Typography variant="h5">
                Contact
            </Typography>
            <Typography>
                <Box component="span" display="inline" style={{fontWeight: "bold"}}>
                    Phone:
                </Box>
                {" " + props.restaurant.phone}
            </Typography>
        </Stack>
    )
}

export default ContactSection;