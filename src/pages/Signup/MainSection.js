import React from 'react'
import useStyles from './signup-styles'
import { Typography, Button, Container, Grid, CardMedia, CardContent, CardActions, Card, Stack} from '@mui/material';
import { Link } from 'react-router-dom';
import BasicCard from '../BasicCard';


function MainSection() {

    const classes = useStyles();

    return (
    
        <div className={classes.contained} style={{backgroundColor: "#f7f7f7"}}> 
            <Container maxWidth="md">
                <Stack className={classes.stackmiddle} direction="row" justifyContent="space-between">
                    <BasicCard/>
                    <BasicCard/>
                </Stack>
            </Container>
        </div>

    );
}

export default MainSection;