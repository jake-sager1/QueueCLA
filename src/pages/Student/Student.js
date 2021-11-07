import { Typography, Button, Grid, Container, CssBaseline, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import React from 'react'
import useStyles from './student-styles';
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import MainSection from './MainSection';

function Home() {

    const classes = useStyles();

    return (
        <div className={classes.page}>
            <Header />
            <MainSection />
            <div>
                <Footer />
            </div>

        </div>


    );
}

export default Home;
