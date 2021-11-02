import { Typography, Button, Grid, Container, CssBaseline, Card, CardMedia, CardContent, CardActions } from '@material-ui/core';
import React from 'react'
import useStyles from './home-styles';
import Header from './Header';
import Footer from './Footer';
import MainSection from './MainSection';

function Home() {

    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <Header />
            <MainSection />
            <Footer />
        </>
    );
}

export default Home;
