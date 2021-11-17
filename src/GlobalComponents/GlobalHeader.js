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

function StackProfile(props) {
  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
      <Typography>Welcome {props.username}!</Typography>
      <AccountBoxIcon fontSize='large'/>
    </Stack>
  )
}

function Ribbon(props) {
  return (
    <AppBar position="sticky" style={{backgroundColor: "#2774AE", color: "white", height: "5vh", alignItems: 'center', }} elevation={1}>
      <Toolbar>
      <div className="center">
        <Typography style={{paddingBottom: '1.3vh' }}>You are currently #NULL{props.linenumber} in line at NULL{props.resturantID}</Typography>
      </div>
      </Toolbar>
    </AppBar>

  )
}

function GlobalHeader(props) {

    const classes = useStyles();
    const isLoggedIn = props.isLoggedIn
    const userName = props.username
    const inline = props.inline

    let stackRight;

    if(!isLoggedIn) {
      stackRight = <StackLogin/>;
    } else {
      stackRight = <StackProfile username={userName}/>;
    }

    let ribbon;

    if(inline) {
      ribbon = <Ribbon/>
    } else {
      ribbon = <div/>
    }

    return (
      <div>
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
        {ribbon}
      </div>

    );
}

export default GlobalHeader;
