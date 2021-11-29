import React from 'react'
import useStyles from './about-styles.js'
import { Typography, Button, Container, Grid, CardMedia, CardContent, CardActions, Card} from '@mui/material';
import Person from './Person'
import { Link } from 'react-router-dom';

function MainSection() {
    const classes = useStyles();
    return (
        <div>
            <Container maxWidth="md">
                <Grid container spacing={2} alignItems="stretch">
                    <Card className={classes.card}>
                        <CardMedia 
                            component="img"
                            image="https://source.unsplash.com/random"
                            height="140"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom align="center" variant="h5" component="div">
                                Jake Sager
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardMedia 
                            component="img"
                            image="https://source.unsplash.com/random"
                            height="140"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom align="center" variant="h5" component="div">
                                Jake Sager
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Container>
        </div>
    );
}

export default MainSection