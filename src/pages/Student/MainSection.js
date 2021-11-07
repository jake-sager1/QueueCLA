import React from 'react'
import useStyles from './student-styles'
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, CardActionArea } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import BasicCard from '../BasicCard';
import image1 from '../../images/dining.jpeg'
import image2 from '../../images/background.jpeg'



function MainSection(props) {


  const classes = useStyles();

  let searchCards = [];

  for(let i = 0; i < 6; i++) {
    const card = props.cards[i];
    if(card.heading.toLowerCase().includes(props.searchValue.toLowerCase()) ||
       card.text.toLowerCase().includes(props.searchValue.toLowerCase())) {
        searchCards.push(card);
    } 
  }

  return (

      <div className={classes.contained} style={{backgroundColor: "#f7f7f7"}}>
          <Container maxWidth="md">

            <Grid container spacing={2} alignItems="stretch">
                {searchCards.map(card => (
                
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardActionArea component={Link} to={"/restaurants/" + card.id} className={classes.cardActionArea}>
                                <CardMedia className={classes.cardMedia} image={card.image} title="Image Title"></CardMedia>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5">
                                        {card.heading}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {card.text}
                                    </Typography>
                                </CardContent>
                                {/* <CardActions>
                                    <Link to={{pathname: "/card", state: {card: card, hasValue: true}}}><Button size="small" color="primary" className={classes.cardButtons}>View</Button></Link>
                                    <Button size="small" color="primary" className={classes.cardButtons}>Edit</Button>
                                </CardActions> */}
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
