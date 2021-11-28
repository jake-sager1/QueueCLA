import { Typography, Container, Stack, Paper, Button, IconButton, TextField, Grid, Select, MenuItem } from '@mui/material';
import React from 'react';
import useStyles from '../Restaurant/restaurant-styles';
import EditIcon from '@mui/icons-material/Edit';
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import { spacing } from '@mui/system';
import {auth} from '../../service/firebase'

function UserSignup() {

    const classes = useStyles();

    return (
        <div className={classes.page}>
            <Header />
            <div className={classes.contained} style={{backgroundColor: "#f7f7f7"}}>
                <Container maxWidth="md">
                    <Paper style={{backgroundColor: "#FFF"}}>
                        <Stack direction="column" spacing={3}>
                        <Typography spacing="5" variant="h5" style={{fontWeight: "bold"}}>Welcome, {auth.currentUser.displayName}</Typography>
                        </Stack>
                    </Paper>
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default UserSignup;
