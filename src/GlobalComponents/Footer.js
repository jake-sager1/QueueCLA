import React from 'react'
import { Typography, Grid, Container} from '@mui/material';
import { Stack } from '@mui/material';
import useStyles from './global-styles'
import { Link } from 'react-router-dom';


function Footer() {

    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Container maxWidth="md" style={{padding: "40px"}}>
                <Grid container spacing={2}>
                    <Grid item spacing={5} xs={12} md={4}>
                        <Stack spacing={1} justifyContent="left">
                            <Typography style={{fontWeight: "bold"}}>Our Partners</Typography>
                            <Link to="/manage" style={{color: "white", textDecoration: "none"}}>
                                <Typography>Manage Your Restaurant</Typography>
                            </Link>
                            <Link to="/manage" style={{color: "white", textDecoration: "none"}}>
                                <Typography>Become a Partner</Typography>
                            </Link>
                        </Stack>
                    </Grid>
                    <Grid item spacing={5} xs={12} md={4}>
                        <Stack spacing={1} justifyContent="left">
                            <Typography style={{fontWeight: "bold"}}>Social Media</Typography>
                            <Typography>Facebook</Typography>
                            <Typography>Instagram</Typography>
                            <Typography>Snapchat</Typography>
                        </Stack>
                    </Grid>
                    <Grid item spacing={5} xs={12} md={4}>
                        <Stack spacing={1} justifyContent="left">
                            <Typography style={{fontWeight: "bold"}}>Information</Typography>
                            <Typography>About Us</Typography>
                            <Typography>Privacy Policy</Typography>
                            <Typography>Terms of Service</Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Footer;