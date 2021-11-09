import React from 'react'
import useStyles from './restaurant-styles'
import { Typography, Stack, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, CardActionArea, Avatar } from '@mui/material'
import { Link } from 'react-router-dom';



function BannerSection(props) {

  const classes = useStyles();

  return (

      <div className={classes.mainImage} style={{backgroundImage: "url(https://s3.amazonaws.com/cms.ipressroom.com/173/files/20208/5f735e982cfac252edce64a4_Royce+Hall/Royce+Hall_hero.jpg)"}}>
          <Container maxWidth="md">
                <Stack direction="row" alignItems="flex-end" spacing={5}>
                    <Avatar className={classes.avatar} sx={{width: 120, height: 120}} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                    <Typography variant="h3" component="h1" style={{color: "white", paddingBottom: "5px"}}>
                        {props.restaurant.name}
                    </Typography>
                </Stack>
          </Container>
      </div>

  );
}


export default BannerSection;
