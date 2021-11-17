import React from 'react'
import useStyles from './global-styles'
import { Typography, Button, Container, AppBar, Toolbar } from '@mui/material';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function StackLogin() {
  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
        <Link to="/login" style={{textDecoration: "none"}}><Button variant="text" color="primary">Log In</Button></Link>
        <Link to="../signup" style={{textDecoration: "none"}}><Button variant="contained" color="primary" href="../signup">Sign Up</Button></Link>
    </Stack>
  )
}

function StackProfile() {
  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
      <AccountBoxIcon fontSize='large'/>
    </Stack>
  )
}

function GlobalHeader(props) {

    const classes = useStyles();
    const isLoggedIn = props.isLoggedIn;

    let stackRight;

    if(!isLoggedIn) {
      stackRight = <StackLogin/>;
    } else {
      stackRight = <StackProfile/>;
    }

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
                        {stackRight}
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default GlobalHeader;
