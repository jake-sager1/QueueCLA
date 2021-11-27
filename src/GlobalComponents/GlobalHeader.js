import React from 'react'
import useStyles from './global-styles'
import { Avatar, AppBar, Toolbar, Container, Stack, Typography, Button, Menu, MenuItem, ListItemIcon, Tooltip, IconButton} from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchBar from './SearchBar';

function StackLogin() {
  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
        <Link to="/login" style={{textDecoration: "none"}}><Button variant="text" color="primary">Log In</Button></Link>
        <Link to="../signup" style={{textDecoration: "none"}}><Button variant="contained" color="primary" href="../signup">Sign Up</Button></Link>
    </Stack>
  )
}

function SearchArea(props) {

  const classes = useStyles();

    return (
      <div className={classes.searchBar}>
        <SearchBar options={Object.keys(props.restaurants).map((id) => props.restaurants[id].name)}/>
     </div>
    );
}

function StackProfile(props) {

  const classes = useStyles();
  let isLoggedIn = true;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };


  return (



    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
      {/* <Typography>Welcome {props.username}!</Typography> */}

      {
          !isLoggedIn ? (
              <Link to="../signup" style={{textDecoration: "none"}}>
                  <Button variant="contained" color="primary" href="../404">Sign In</Button>
              </Link>
          ) :
          (

              <Tooltip title="Account settings">
                  <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                      <Typography style={{height: "44px", width: "44px", borderRadius: "100%", display: "flex", alignItems: "center", justifyContent: "space-around",
                      color: "white", backgroundColor: "#FFD100"}} variant="h4">{props.user.name[0]}</Typography>
                   </IconButton>
              </Tooltip>

      )}
      <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
          elevation: 0,
          sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
              },
              '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 22,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              },
          },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
          <Link to="/404" style={{textDecoration: "none", color: "black"}}>
              <MenuItem>
                  <ListItemIcon>
                      <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
              </MenuItem>
          </Link>
          <Link to="/404" style={{textDecoration: "none", color: "black"}}>
              <MenuItem>
                  <ListItemIcon>
                      <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
              </MenuItem>
          </Link>
      </Menu>

    </Stack>
  )
}

function Ribbon(props) {

  let spotInLine;

  if(props.user.inLine) {
    for(var i = 0; i < props.restaurants[props.user.restaurantID].waitlist.length; i++) {
      if(props.restaurants[props.user.restaurantID].waitlist[i] == props.user.id)
      {
        spotInLine = i + 1;
      }
    }
  }

  return (
    <div style={{backgroundColor: "#2774AE", display: "flex", alignItems: "center", color: "white", padding: "5px"}} elevation={1}>
        <Container>
          <Stack direction="column" alignItems="center">
            <Typography>You are currently #{spotInLine} in line at&nbsp; 
            <a style={{color: "white"}}href={"/restaurants/" + props.user.restaurantID}>{props.restaurants[props.user.restaurantID].name}</a>.</Typography>
          </Stack>
        </Container>
    </div>

  )
}

function GlobalHeader(props) {

    const classes = useStyles();
    const isLoggedIn = props.isLoggedIn
    const userName = props.user.name;
    const inline = props.user.inLine;

    let stackRight;

    if(!isLoggedIn) {
      stackRight = <StackLogin/>;
    } else {
      stackRight = <StackProfile user={props.user}/>;
    }

    let ribbon;

    if(inline) {
      ribbon = <Ribbon user={props.user} restaurants={props.restaurants}/>
    } else {
      ribbon = <div/>
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
                          <Stack direction="row" spacing={1} alignItems="center">
                            {isLoggedIn && 
                              <SearchArea restaurants={props.restaurants}/>
                            }
                            {stackRight}
                          </Stack>
                      </Stack>
                  </Container>
              </Toolbar>
              {ribbon}
          </AppBar>

    );
}

export default GlobalHeader;
