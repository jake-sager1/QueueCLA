import React from 'react'
import useStyles from './notfound-styles.js'
import { Typography, Button, Container, Grid, CardMedia, CardContent, CardActions, Card} from '@mui/material';
import { Link } from 'react-router-dom';
import error404image from '../../images/404PageImage.jpg'

function MainSection() {
    const classes = useStyles();
    return (
        <div className={classes.mainbackground}>
            <img className={classes.image404} src={error404image}/>
        </div>
    );
}

export default MainSection