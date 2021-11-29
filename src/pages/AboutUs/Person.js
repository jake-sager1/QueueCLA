import React from 'react'
import useStyles from './about-styles'
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, CardActionArea } from '@mui/material'

function Person (props) {
    const classes = useStyles()
    return(
        // <div className={classes.personcontainer}>
        //     <div className={classes.imagecontainer}>
        //         <img className={classes.displaypic} src="https://source.unsplash.com/random" />
        //     </div>
        //     <div className={classes.namecontainer}>
        //         {props.name}
        //     </div>
        // </div>
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia 
                    component="img"
                    image="https://source.unsplash.com/random"
                    height="140"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom align="center" variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Person