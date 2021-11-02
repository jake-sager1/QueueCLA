import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Grid, CardMedia, CardContent, Typography, CardActions, Button, Card } from '@material-ui/core'
import useStyles from '../style'
import { useLocation } from 'react-router-dom'


function CardPage() {

    const classes = useStyles();
    const location = useLocation();
    const card = location.state?.card;
    const hasValue = location.state?.hasValue;

    return (
       <>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardMedia className={classes.cardMedia} image={hasValue ? card.image : ""} title="Image Title"></CardMedia>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5">
                            Heading
                        </Typography>
                        <Typography color="textSecondary">
                            {hasValue ? card.text : ""}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to="/"><Button size="small" color="primary" className={classes.cardButtons}>Return to Home</Button></Link>
                    </CardActions>
                </Card>
            </Grid>
        </>
    );
}

export default CardPage;