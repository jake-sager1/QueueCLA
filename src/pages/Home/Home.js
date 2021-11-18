import { Typography, Button, Grid, Container, CssBaseline, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import React from 'react'
import useStyles from './home-styles';
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import GlobalHeader from '../../GlobalComponents/GlobalHeader';
import MainSection from './MainSection';
import {auth} from '../../service/firebase'

function Home(props) {

    const classes = useStyles();
    return (
        <div className={classes.page}>
            <GlobalHeader isLoggedIn={auth.currentUser != null} inline={true} username={auth.currentUser != null? auth.currentUser.displayName : ''}/>
            {/* We need to adjust the prop isLoggedIn and inline based on GoogleAuth from backend */}
            <MainSection />
            <Footer />
        </div>

    );
}

export default Home;
