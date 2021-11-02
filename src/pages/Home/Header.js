import React from 'react'
import useStyles from './home-styles'
import { Typography, Button, Container, AppBar, Toolbar} from '@material-ui/core';
import { Stack } from '@mui/material';

function Header() {

    const classes = useStyles();

    return (
        <AppBar position="sticky" style={{backgroundColor: "white", color: "black"}} elevation={2}>
            <Toolbar>
                <Container className={classes.homeNavBar} maxWidth="md">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        
                        <Typography variant="h4" component="h1">
                            QueueCLA
                        </Typography>
                        
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                            <Button variant="text">Log In</Button>
                            <Button variant="contained" color="secondary">Sign Up</Button>
                        </Stack>
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Header;

