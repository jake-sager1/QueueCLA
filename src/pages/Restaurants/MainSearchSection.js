import React from 'react'
import useStyles from './restaurants-styles'
import { Typography, Card, CardContent, CardMedia, Grid, Container, CardActionArea, IconButton, Tooltip } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import MenuChip from '../../GlobalComponents/Chips';

function filterRestaurantsByQuery(restaurants, query) {

    let matches = [];

    for(let i = 0; i < restaurants.length; i++) {
        // Check if name matches first
        if(restaurants[i].name.toLowerCase().includes(query.toLowerCase())) {
            matches.push(i);
        }
    }
    
    for(let i = 0; i < restaurants.length; i++) {
        // Next, add restaurants whose descriptions match
        if(restaurants[i].description.toLowerCase().includes(query.toLowerCase())) {
            if(!matches.includes(i)) {
                matches.push(i);
            } 
        }
    }

    for(let i = 0; i < restaurants.length; i++) {
        if(restaurants[i].menu.toLowerCase().includes(query.toLowerCase())) {
            if(!matches.includes(i)) {
                matches.push(i);
            } 
        }
    }

    for(let i = 0; i < restaurants.length; i++) {
        for(let j = 0; j < restaurants[i].chips.length; j++) {
            if(restaurants[i].chips[j].toLowerCase().includes(query.toLowerCase())) {
                if(!matches.includes(i)) {
                    matches.push(i);
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

      <div className={classes.contained} style={{backgroundColor: "#f7f7f7"}}>
        <Container maxWidth="md">
            <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Tooltip title="Return to restaurants">
                        <Link to="/restaurants">
                            <IconButton>
                                <ArrowBack fontSize="large"/>
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

                                <Stack className={classes.chips} direction="row" spacing={1}>
                                    {props.restaurants[id].chips.map((name) => 
                                        <MenuChip name={name} 
                                        onClick={null}
                                        variant="outlined"/>
                                    )}
                                </Stack>
                            </CardActionArea>
                        </Card>
                    </Grid>
                        ))}
                </Grid>
            </Stack>
        </Container>
    </div>

  );
}


export default MainSearchSection;
