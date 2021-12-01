import React from 'react'
import useStyles from './home-styles'
import { Typography, Button, Container, Grid, CardMedia, CardContent, CardActions, Card} from '@mui/material';
import { Link } from 'react-router-dom';

function MainSection() {

    const classes = useStyles();

    return (

        <div style={{backgroundColor: "#f7f7f7"}} className={classes.secondSection}>
                <Container maxWidth="md">
                    <Grid container columnSpacing={5} rowSpacing={10}>
                        <Grid item xs={12} md={7}>
                            <Typography variant="h2" component="h2" align="left">
                                Get in line at your favorite restaurants without leaving your couch.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5} >
                            <Card className={classes.card}>
                                <CardMedia className={classes.cardMedia} image="https://wp.dailybruin.com/images/2016/10/web.ns_.bcafdrinks.LU_.jpg" title="Image Title"></CardMedia>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5">
                                        Bruin Café
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Serves: Coffee, Sandwiches, Salads
                                    </Typography>
                                </CardContent>
                                <CardActions style={{padding: "15px"}}>
                                        <Button size="small" variant="contained" color="primary" className={classes.cardButtons}>Explore</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
    );
}

export default MainSection;
