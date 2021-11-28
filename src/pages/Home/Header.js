import React from 'react'
import useStyles from './home-styles'
import { Typography, Button, Container, AppBar, Toolbar } from '@mui/material';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {

    const classes = useStyles();

    return (
        <AppBar position="sticky" style={{backgroundColor: "white", color: "black"}} elevation={2}>
            <Toolbar>
                <Container className={classes.homeNavBar} maxWidth="md">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Link to="/" style={{textDecoration: "none"}}>
                            <Typography variant="h4" component="h1" className={classes.logo}>
                                QueueCLA
                            </Typography>
                        </Link>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                            <Link to="/login" style={{textDecoration: "none"}}><Button variant="text" color="primary">Log In</Button></Link>
                            <Link to="../signup" style={{textDecoration: "none"}}><Button variant="contained" color="primary" href="../signup">Sign Up</Button></Link>
                        </Stack>
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
