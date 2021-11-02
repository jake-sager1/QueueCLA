import React from 'react'
import useStyles from './home-styles'
import { Typography, Button, Container, Grid, CardMedia, CardContent, CardActions, Card} from '@material-ui/core';
import { Link } from 'react-router-dom';

function MainSection() {

    const classes = useStyles();

    return (

        <div style={{backgroundColor: "#f7f7f7"}} className={classes.secondSection}> 
                <Container maxWidth="md">
                    <Grid container spacing={5}>
                        <Grid item xs={7}>
                            <Typography variant="h2" component="h2" align="left">
                                Get in line at your favorite restaurants without leaving your couch.
                            </Typography>
                        </Grid>
                        <Grid item xs={5} container>
                            <Grid item xs={12}>
                                <Card className={classes.card}>
                                    <CardMedia className={classes.cardMedia} image="https://source.unsplash.com/random" title="Image Title"></CardMedia>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5">
                                            Bruin Café
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Serves: Coffee, Sandwiches, Salads
                                        </Typography>
                                    </CardContent>
                                    <CardActions style={{padding: "15px"}}>
                                        <Link style={{textDecoration: 'none'}} to={{pathname: "/card", state: {card: {text: "This is a card!", image: "https://source.unsplash.com/random"}, hasValue: true}}}>
                                            <Button size="small" variant="contained" color="secondary" className={classes.cardButtons}>Explore</Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
    );
}

export default MainSection;