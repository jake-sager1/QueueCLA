import React from 'react'
import useStyles from './restaurants-styles'
import { Typography, Button, Container, AppBar, Toolbar } from '@mui/material';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
//import SearchBar from "../../GlobalComponents/SearchBar"
/*
To learn about arrow functions assosciated with the search bar, look at docs.
https://www.npmjs.com/package/material-ui-search-bar
*/

function Header(props) {

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
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
