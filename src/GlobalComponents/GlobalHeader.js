import React from 'react'
import useStyles from './global-styles'
import { Avatar, AppBar, Toolbar, Container, Stack, Typography, Button, Menu, MenuItem, ListItemIcon, Tooltip, IconButton} from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
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
      <Typography>Welcome {props.username}!</Typography>

      {
          !isLoggedIn ? (
              <Link to="../signup" style={{textDecoration: "none"}}>
                  <Button variant="contained" color="primary" href="../404">Sign In</Button>
              </Link>
          ) :
          (

              <Tooltip title="Account settings">
                  <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                  <Avatar className={classes.avatar}
                      sx={{width: 40, height: 40}}
                     />
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
              right: 14,
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
