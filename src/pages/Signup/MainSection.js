import React from 'react'
import useStyles from './signup-styles'
import { Typography, Button, Container, Grid, CardMedia, CardContent, CardActions, Card, Stack} from '@mui/material';
import { Link } from 'react-router-dom';
import BasicCard from '../BasicCard';




function MainSection() {

    const classes = useStyles();

    return (
    
    <div className={classes.contained} style={{backgroundColor: "#f7f7f7"}}> 

        <div className={classes.middle}>
            <Stack className={classes.stackmiddle} direction="row" spacing={40}>
                <BasicCard/>
                <BasicCard/>
            </Stack>
        </div>

    </div>

    );
}

export default MainSection;