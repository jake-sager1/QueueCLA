import React from 'react';
import { AppBar, Toolbar, Container, Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './restaurant-styles';

function Header(props) {

    const classes = useStyles();

    return (
        <AppBar position="sticky" style={{backgroundColor: "#103048", color: "black"}} elevation={2}>
            <Toolbar>
                <Container className={classes.homeNavBar} maxWidth="md">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Link to="/" style={{textDecoration: "none"}}>
                            <Typography variant="h4" component="h1" className={classes.logo}>
                                QueueCLA for Restaurants
                            </Typography>
                        </Link>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                            <Link to="../signup" style={{textDecoration: "none"}}>
                                <Button variant="contained" color="primary" href="../restaurantlogin">Sign In</Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    );

}

export default Header;