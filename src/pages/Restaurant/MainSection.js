import React from 'react'
import useStyles from './restaurant-styles'
import { Typography, Stack, Box, Chip, Paper, Button, Container, Avatar, Divider } from '@mui/material'
import { IconButton, Tooltip } from '@mui/material';
import { Star, StarOutline } from '@mui/icons-material';
import theme from '../../theme';
import JoinLineSection from './JoinLineSection';
import ContactSection from './ContactSection';
import MenuChip from '../../GlobalComponents/Chips';
import HoursSection from './HoursSection';

function MenuSection(props) {

    const classes = useStyles();

    return (
        <Stack direction="column" spacing={2}>
            <Typography variant="h5">
                Menu
            </Typography>
            <Typography style={{ marginLeft: "10px" }}>
                <pre style={{ fontFamily: "roboto", color: "#555" }}>{props.restaurant.menu}</pre>
            </Typography>
        </Stack>
    )
}

class FavoriteStar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorited: this.props.user.favorites.includes(this.props.id),
        }
    }

    handleClick() {
        console.log("props.id is: " + this.props.id);
        console.log(this.props.user.favorites);
        if (this.state.favorited) {
            this.setState({ favorited: false, });
            let userFavorites = this.props.user.favorites;
            userFavorites.find((restID, i) => {
                if (restID === this.props.id) {
                    userFavorites.splice(i, 1);
                }
            });
            let changes = {
                favorites: userFavorites
            };
            editUser(this.props.user.id, changes).then(() => {
                this.props.changeUserData(changes);
            });
        }
        else {
            this.setState({ favorited: true });
            let userFavorites = this.props.user.favorites;
            userFavorites.push(this.props.id);
            let changes = {
                favorites: userFavorites
            };
            editUser(this.props.user.id, changes).then(() => {
                this.props.changeUserData(changes);
            });
        }
    }

    render() {
        return (
            <Tooltip title={this.state.favorited ? "Remove from favorites" : "Add to favorites"}>
                <IconButton onClick={this.handleClick.bind(this)} sx={{ color: "#FFD100" }}>
                    {this.state.favorited ?
                        <Star /> :
                        <StarOutline />
                    }
                </IconButton>
            </Tooltip>
        );
    };
}

function MainSection(props) {

    const classes = useStyles();

    return (

        <div className={classes.mainSection}>
            <Container maxWidth="md">
                <Stack direction="column" spacing={5}>
                    <Box style={{ padding: "0px 17px", }}>
                        <Stack direction="row" justifyContent="flex-start">
                            <Box sx={{
                                [theme.breakpoints.up('xs')]: {
                                    width: "0",
                                },
                                [theme.breakpoints.up('sm')]: {
                                    width: "120px",
                                    marginRight: "2em",
                                }
                            }} />
                            <Stack direction="column" spacing={1}>
                                <Stack direction="row" justifyContent="space-between" spacing={3} alignItems="center">
                                    <Typography>
                                        {props.restaurant.description}
                                    </Typography>
                                    <FavoriteStar id={props.id} user={props.user} changeUserData={props.changeUserData} />
                                </Stack>

                                <HoursSection restaurant={props.restaurant} />

                                <Stack className={classes.chips} direction="row" alignItems="center" spacing={1}>
                                    {props.restaurant.chips.map((chip) => (

                                        <MenuChip name={chip}
                                            onClick={null}
                                            variant="filled" />
                                    ))}
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                    <Paper className={classes.linePaper}>
                        <Stack direction="column" spacing={4}>
                            <JoinLineSection restaurants={props.restaurants} restaurant={props.restaurant} user={props.user}
                                changeUserData={props.changeUserData} changeRestaurantData={props.changeRestaurantData}
                                index={props.index}
                            />
                            <Divider />
                            <MenuSection restaurant={props.restaurant} />
                            <Divider />
                            <ContactSection restaurant={props.restaurant} />
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </div>

    );
}

async function editUser(id, editProps) {
    const body = {
        data: editProps,
        id: id
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    fetch('http://localhost:5001/user/edit', requestOptions)
        .then(response => response.json())
        .then(data => { console.log(data) });
}

export default MainSection;
