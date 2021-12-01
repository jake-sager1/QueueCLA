import React from 'react'
import useStyles from './restaurants-styles'
import { Typography, Box, Card, CardContent, CardMedia, Grid, Container, CardActionArea, IconButton, Tooltip, CardActions } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import MenuChip from '../../GlobalComponents/Chips';

function filterRestaurantsByQuery(restaurants, query) {

    let matches = [];

    for (let i = 0; i < Object.keys(restaurants).length; i++) {
        // Check if name matches first
        let key = Object.keys(restaurants)[i];
        if (restaurants[key].name.toLowerCase().includes(query.toLowerCase())) {
            matches.push(key);
        }
    }

    for (let i = 0; i < Object.keys(restaurants).length; i++) {
        // Next, add restaurants whose descriptions match
        let key = Object.keys(restaurants)[i];
        if (restaurants[key].description.toLowerCase().includes(query.toLowerCase())) {
            if (!matches.includes(key)) {
                matches.push(key);
            }
        }
    }

    for (let i = 0; i < Object.keys(restaurants).length; i++) {
        let key = Object.keys(restaurants)[i];
        if (restaurants[key].menu.toLowerCase().includes(query.toLowerCase())) {
            if (!matches.includes(key)) {
                matches.push(key);
            }
        }
    }

    for (let i = 0; i < Object.keys(restaurants).length; i++) {
        let key = Object.keys(restaurants)[i];
        for (let j = 0; j < restaurants[key].chips.length; j++) {
            if (restaurants[key].chips[j].toLowerCase().includes(query.toLowerCase())) {
                if (!matches.includes(key)) {
                    matches.push(key);
                }
            }
        }
    }

    return matches;
}


function MainSearchSection(props) {

    const classes = useStyles();

    let restaurantsToList = filterRestaurantsByQuery(props.restaurants, props.query);


    return (

        <div className={classes.contained} style={{ backgroundColor: "#f7f7f7" }}>
            <Container maxWidth="md">
                <Stack direction="column" spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Tooltip title="Return to restaurants">
                            <Link to="/restaurants">
                                <IconButton>
                                    <ArrowBack fontSize="large" />
                                </IconButton>
                            </Link>
                        </Tooltip>
                        <Typography variant="h4">
                            {restaurantsToList.length > 0 ?
                                "Showing results for \"" + props.query + "\":"
                                :
                                "No results found for \"" + props.query + "\"."
                            }
                        </Typography>
                    </Stack>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} alignItems="stretch">
                            {restaurantsToList.map((id) => (
                                <Grid item key={id} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardActionArea component={Link} to={"/restaurants/" + id} className={classes.cardActionArea}>
                                            <CardMedia className={classes.cardMedia} image={props.restaurants[id].bannerImage} title="Image Title"></CardMedia>
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5">
                                                    {props.restaurants[id].name}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    {props.restaurants[id].description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Stack className={classes.chips} direction="row" style={{ overflow: "scroll", position: "relative", bottom: "0" }} spacing={1}>
                                                    {props.restaurants[id].chips.map((name) =>
                                                        <MenuChip name={name}
                                                            onClick={null}
                                                            variant="outlined" />
                                                    )}
                                                </Stack>
                                            </CardActions>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Stack>
            </Container>
        </div>

    );
}


export default MainSearchSection;
