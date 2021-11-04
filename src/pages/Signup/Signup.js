import { Typography, Button, Grid, Container, CssBaseline, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import React from 'react'
import useStyles from './signup-styles';
import Header from './Header';
import Footer from './Footer';
import MainSection from './MainSection';

function Home() {

    return (
        <>
            <Header />
            <MainSection />
            <Footer />
        </>

    );
}

export default Home;
