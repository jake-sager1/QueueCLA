import { Typography, Button, Box, Grid, Container, AppBar, Toolbar, CssBaseline, Paper, Card, CardMedia, CardContent, CardActions } from '@material-ui/core';
import { Stack } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import useStyles from '../style';

function Home() {

    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <AppBar position="sticky" style={{backgroundColor: "white", color: "black"}}>
                <Toolbar>
                    <Container className={classes.homeNavBar} maxWidth="md">
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            
                            <Typography variant="h4" component="h1">
                                QueueCLA
                            </Typography>
                            
                            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                                <Button variant="text" color="theme.palette.light">Log In</Button>
                                <Button variant="contained" color="secondary">Sign Up</Button>
                            </Stack>
                        </Stack>
                    </Container>
                </Toolbar>
            </AppBar>
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
            <div style={{backgroundColor: "#3d3d3d", color:"white"}}>
                <Container maxWidth="md" style={{padding: "20px"}}>
                    <Typography>This is the footer.</Typography>
                    <Typography>This is the footer.</Typography>
                    <Typography>This is the footer.</Typography>
                    <Typography>This is the footer.</Typography>
                    <Typography>This is the footer.</Typography>
                    <Typography>This is the footer.</Typography>
                </Container>
            </div>
        </>
    );
}

export default Home;
