import React from 'react'
import useStyles from './about-styles.js'
import { Typography, Button, Container, Grid, CardMedia, CardContent, CardActions, Card} from '@mui/material';
import Person from './Person'
import { Link } from 'react-router-dom';

function MainSection() {
    const classes = useStyles();
    return (
        <div className={classes.contained} style={{backgroundColor: "#f7f7f7"}}>
            <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            >
                QueueCLA
            </Typography>
            <Container maxWidth="md">
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    We solve a problem rampant on UCLA's campus -- what the British call queuing.
                    We provide a platform for students to stand in virtual queues and for restaurants to
                    monitor these queues.
                </Typography>
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