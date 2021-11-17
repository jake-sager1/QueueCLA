import { Typography, Button, Grid, Container, CssBaseline, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import React from 'react'
import useStyles from './home-styles';
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import GlobalHeader from '../../GlobalComponents/GlobalHeader';
import MainSection from './MainSection';

function Home(props) {

    const classes = useStyles();

    return (
        <div className={classes.page}>
            <GlobalHeader isLoggedIn={true} username={props.user.name}/>
            {/* We need to adjust the prop isLoggedIn based on GoogleAuth from backend */}
            <MainSection />
            <Footer />
        </div>

    );
}

export default Home;
