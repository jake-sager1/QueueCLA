import React from 'react'
import useStyles from './student-styles'
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import BasicCard from '../BasicCard';
import image1 from '../../images/dining.jpeg'
import image2 from '../../images/background.jpeg'



function MainSection() {

  const classes = useStyles();

  const cards = [
      {number: 1,
          heading: "Bruin Cafe",
          text: "Soups, salads, and sandwiches!",
          image: "https://source.unsplash.com/random",},
      {number: 2,
          heading: "Bruin Bowl",
          text: "A takeout place to grab a variety of bowls!",
          image: "https://source.unsplash.com/random",},
      {number: 3,
          heading: "Bruin Plate",
          text: "Organics...",
          image: "https://source.unsplash.com/random",},
      {number: 4,
          heading: "De Neve",
          text: "Unhealthy as hell.",
          image: "https://source.unsplash.com/random",},
      {number: 5,
          heading: "De Neve",
          text: "Unhealthy as hell.",
          image: "https://source.unsplash.com/random",},
      {number: 6,
          heading: "Epicura",
          text: "Mediterranean food!",
          image: "https://source.unsplash.com/random",}

  ]

  return (

      <div className={classes.contained} style={{backgroundColor: "#f7f7f7"}}>
          <Container maxWidth="md">

          <Grid container spacing={4}>
              {cards.map(card => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                          <CardMedia className={classes.cardMedia} image={card.image} title="Image Title"></CardMedia>
                          <CardContent className={classes.cardContent}>
                              <Typography gutterBottom variant="h5">
                                  {card.heading}
                              </Typography>
                              <Typography color="textSecondary">
                                  {card.text}
                              </Typography>
                          </CardContent>
                          <CardActions>
                              <Link to={{pathname: "/card", state: {card: card, hasValue: true}}}><Button size="small" color="primary" className={classes.cardButtons}>View</Button></Link>
                              <Button size="small" color="primary" className={classes.cardButtons}>Edit</Button>
                          </CardActions>
                      </Card>
                  </Grid>
              ))}
          </Grid>

          </Container>
      </div>

  );
}


export default MainSection;
