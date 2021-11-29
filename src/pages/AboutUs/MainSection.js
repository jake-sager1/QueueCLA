import React from 'react'
import useStyles from './about-styles.js'
import { Typography, Button, Container, Grid, CardMedia, CardContent, CardActions, Card} from '@mui/material';
import Person from './Person'
import { Link } from 'react-router-dom';

function MainSection() {
    const classes = useStyles();
    return (
        <div className={classes.contained} style={{backgroundColor: "#f7f7f7"}}>
            <Container maxWidth="md">
                <Grid container spacing={2} alignItems="stretch">
                    <Person 
                        name="Jake Sager"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum!"
                    />
                    <Person 
                        name="Avii Ahuja"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum!"
                    />
                    <Person 
                        name="Hritik Arya"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum!"
                    />
                    <Person 
                        name="Molly Wehrenberg"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum!"
                    />
                    <Person 
                        name="Jakub Hojsan"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum!"
                    />
                </Grid>
            </Container>
        </div>
    );
}

export default MainSection