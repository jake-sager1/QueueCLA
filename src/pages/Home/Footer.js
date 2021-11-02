import React from 'react'
import { Typography, Grid, Container} from '@material-ui/core';
import { Stack } from '@mui/material';

function Footer() {

    return (
        <div style={{backgroundColor: "#3d3d3d", color:"white"}}>
            <Container maxWidth="md" style={{padding: "40px"}}>
                <Grid container spacing={2}>
                    <Grid container item spacing={5} xs={4}>
                        <Stack spacing={2} justifyContent="left">
                            <Typography>Become a Partner</Typography>
                            <Typography>Contact Us</Typography>
                            <Typography>About Us</Typography>
                            <Typography>Privacy Policy</Typography>
                            <Typography>Terms of Service</Typography>
                        </Stack>
                    </Grid>
                    <Grid container item spacing={5} xs={4}>
                        <Stack spacing={2} justifyContent="left">
                            <Typography>Facebook</Typography>
                            <Typography>Instagram</Typography>
                            <Typography>Snapchat</Typography>
                        </Stack>
                    </Grid>
                    <Grid container item spacing={5} xs={4}>
                        <Stack spacing={2} justifyContent="left">
                            <Typography>Find a Restaurant</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Footer;