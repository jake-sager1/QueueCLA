import React from 'react';
import { Avatar, AppBar, Toolbar, Container, Stack, Typography, Button, Menu, MenuItem, ListItemIcon, Tooltip, IconButton } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useStyles from './restaurant-styles';
import { signInWithGoogleRestaurant } from '../../service/firebase';
import { signOutWithGoogle } from '../../service/firebase';

function Header(props) {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" style={{ backgroundColor: "#103048", color: "black" }} elevation={2}>
            <Toolbar>
                <Container className={classes.homeNavBar} maxWidth="md">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Link to="/manage" style={{ textDecoration: "none" }}>
                            <Typography variant="h4" component="h1" className={classes.logo}>
                                QueueCLA for Restaurants
                            </Typography>
                        </Link>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                            {(!props.page || (props.page !== "line")) && props.isLoggedIn && (
                                <Link to="/manage/line" style={{ textDecoration: "none" }}>
                                    <Button style={{ color: "white" }}>Mangage Line</Button>
                                </Link>
                            )
                            }

                            {
                                !props.isLoggedIn ? (
                                   
                                    <Button variant="contained" color="primary" onClick={signInWithGoogleRestaurant}>Sign In With Google</Button>
                                   
                                ) :
                                    (

                                        <Tooltip title="Account settings">
                                            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                                                <Avatar className={classes.avatar}
                                                    sx={{ width: 50, height: 50 }}
                                                    src={props.restaurant.profileImage} />
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
                                <Link to="/manage/settings" style={{ textDecoration: "none", color: "black" }}>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Settings fontSize="small" />
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                </Link>
                                <Link to="/manage" style={{textDecoration: "none", color: "black"}}>
                                    <MenuItem onClick={signOutWithGoogle}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Link>
                            </Menu>

                        </Stack>
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    );

}

export default Header;
