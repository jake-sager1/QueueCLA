import React from 'react'
import useStyles from './restaurant-styles'
import { Typography, Stack, Box, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, CardActionArea, Avatar } from '@mui/material'
import { Link } from 'react-router-dom';



function MainSection(props) {

  const classes = useStyles();

  return (

      <div className={classes.mainSection}>
          <Container maxWidth="md">
                <Stack direction="row" alignItems="flex-end" spacing={5}>
                    <Box style={{width: "120px"}}/>
                    <Typography>
                        {props.restaurant.description}
                    </Typography>
                </Stack>
          </Container>
      </div>

  );
}


export default MainSection;
