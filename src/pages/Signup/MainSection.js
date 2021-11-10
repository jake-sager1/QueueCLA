import React from 'react'
import useStyles from './signup-styles'
import { Typography, Button, Container, Grid, CardMedia, CardContent, CardActions, Card, Stack} from '@mui/material';
import { Link } from 'react-router-dom';
import BasicCard from '../BasicCard';
import image1 from '../../images/dining.jpeg'
import image2 from '../../images/background.jpeg'
import {signInWithGoogle} from '../../service/firebase';

function MainSection() {

    const classes = useStyles();


    return (

        <div className={classes.contained} style={{backgroundColor: "#f7f7f7"}}>
            <Container maxWidth="md">
                <Grid container spacing={2} justifyContent="space-between">
                        <Card className={classes.card}>
                            <CardMedia className={classes.cardMedia} image={image2} title="Image Title"></CardMedia>
                            <CardContent className={classes.cardContent}>
                                <Typography

                                styles={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent:'center'
                               }}


                                className={classes.middletext} gutterBottom variant="h5">
                                    I am a student
                                </Typography>
                                <Typography  color="textSecondary">
                                    Join any queue on campus in real-time!
                                </Typography>
                            </CardContent>
                            <CardActions style={{padding: "15px"}}>
                                <Link style={{textDecoration: 'none'}} to={{pathname: "/student", state: {card: {text: "This is a card!", image: "https://source.unsplash.com/random"}, hasValue: true}}}>
                                    <Button size="small" variant="contained" color="primary" className={classes.cardButtons} onClick={signInWithGoogle}>Login with Google</Button>
                                </Link>
                            </CardActions>
                        </Card>

                        <Card className={classes.card}>
                            <CardMedia className={classes.cardMedia} image={image1} title="Image Title"></CardMedia>
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.middletext} gutterBottom variant="h5" onClick={signInWithGoogle}>
                                    I am a resturant
                                </Typography>
                                <Typography color="textSecondary">
                                    Manage your profile and queue time!
                                </Typography>
                            </CardContent>
                            <CardActions style={{padding: "15px"}}>
                                <Link style={{textDecoration: 'none'}} to={{pathname: "/card", state: {card: {text: "This is a card!", image: "https://source.unsplash.com/random"}, hasValue: true}}}>
                                    <Button size="small" variant="contained" color="primary" className={classes.cardButtons} onClick={signInWithGoogle}>Login with Google</Button>
                                </Link>
                            </CardActions>
                        </Card>
                </Grid>
            </Container>
        </div>

    );
}

export default MainSection;
