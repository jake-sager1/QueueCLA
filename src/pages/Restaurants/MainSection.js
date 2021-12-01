import React from 'react'
import useStyles from './restaurants-styles'
import { Typography, Box, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, CardActionArea } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import BasicCard from '../BasicCard';
import image1 from '../../images/dining.jpeg'
import image2 from '../../images/background.jpeg'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import DiningIcon from '@mui/icons-material/Dining';
import LocalDiningSharpIcon from '@mui/icons-material/LocalDiningSharp';
import DinnerDiningSharpIcon from '@mui/icons-material/DinnerDiningSharp';
import MenuChip from '../../GlobalComponents/Chips';

function MainSection(props) {

  const classes = useStyles();

    function filterRestaurantsByTags(restaurants, tags){
        let matches = []
        if (tags.length > 0){
            for (let i = 0; i < Object.keys(restaurants).length; i++) {
                let key = Object.keys(restaurants)[i];
                let count = tags.length
                for (let j = 0; j < tags.length; j++){
                    let tag = tags[j]
                    if (restaurants[key].chips.length > 0 && restaurants[key].chips.includes(tag)) {
                        count--;
                    }
                }
                if (count === 0){
                    matches.push(key)
                }
            }
            return matches
        } else {
            return Object.keys(restaurants)
        }
    }

    let restaurantsToList = filterRestaurantsByTags(props.restaurants, props.selectedTags);

  return (

      <div className={classes.contained} style={{backgroundColor: "#f7f7f7"}}>
          <Container maxWidth="md">
            <Stack direction="column" spacing={2}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2} alignItems="stretch">
                        {console.log(props.selectedTags)}
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
                                                <Stack className={classes.chips} direction="row" style={{overflow: "scroll", position: "relative", bottom: "0"}} spacing={1}>
                                                    {props.restaurants[id].chips.map((name) => 
                                                        <MenuChip name={name} 
                                                        onClick={null}
                                                        variant="outlined"/>
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


export default MainSection;
