import React from 'react'
import useStyles from './restaurants-styles'
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, CardActionArea } from '@mui/material'
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

  let searchRestaurants = [];

  for(let i = 1; i <= 6; i++) {
    const restaurant = props.restaurants[i];
    if(restaurant.name.toLowerCase().includes(props.searchValue.toLowerCase()) ||
       restaurant.description.toLowerCase().includes(props.searchValue.toLowerCase())) {
        searchRestaurants.push(restaurant);
    }
  }

  return (

      <div className={classes.contained} style={{backgroundColor: "#f7f7f7"}}>
          <Container maxWidth="md">

            <Grid container spacing={2} alignItems="stretch">
                {searchRestaurants.map(restaurant => (

                    <Grid item key={restaurant} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardActionArea component={Link} to={"/restaurants/" + restaurant.id} className={classes.cardActionArea}>
                                <CardMedia className={classes.cardMedia} image={restaurant.bannerImage} title="Image Title"></CardMedia>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5">
                                        {restaurant.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {restaurant.description}
                                    </Typography>
                                </CardContent>

                                <Stack className={classes.chips} direction="row" spacing={1}>
                                    {restaurant.chips.map((name) => 
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

          </Container>
      </div>

  );
}


export default MainSection;
