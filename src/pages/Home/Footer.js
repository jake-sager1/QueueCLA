import React from 'react'
import { Typography, Grid, Container} from '@mui/material';
import { Stack } from '@mui/material';

function Footer() {

    return (
        <div style={{backgroundColor: "#3d3d3d", color:"white"}}>
            <Container maxWidth="md" style={{padding: "40px"}}>
                <Grid container spacing={2}>
                    <Grid item spacing={5} xs={12} md={4}>
                        <Stack spacing={2} justifyContent="left">
                            <Typography style={{fontWeight: "bold"}}>Quick Links</Typography>
                            <Typography>Become a Partner</Typography>
                            <Typography>Contact Us</Typography>
                            <Typography>About Us</Typography>
                            <Typography>Privacy Policy</Typography>
                            <Typography>Terms of Service</Typography>
                        </Stack>
                    </Grid>
                    <Grid item spacing={5} xs={12} md={4}>
                        <Stack spacing={2} justifyContent="left">
                            <Typography style={{fontWeight: "bold"}}>Social Media</Typography>
                            <Typography>Facebook</Typography>
                            <Typography>Instagram</Typography>
                            <Typography>Snapchat</Typography>
                        </Stack>
                    </Grid>
                    <Grid item spacing={5} xs={12} md={4}>
                        <Stack spacing={2} justifyContent="left">
                            <Typography style={{fontWeight: "bold"}}>Get Help</Typography>
                            <Typography>Find a Restaurant</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Footer;