import React from 'react'
import useStyles from './restaurant-styles'
import { Typography, Stack, Box, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, CardActionArea, Avatar } from '@mui/material'
import { Link } from 'react-router-dom';
import theme from '../../theme';



function BannerSection(props) {

  const classes = useStyles();

  return (

      <div className={classes.mainImage} style={{backgroundImage: "url(" + props.restaurant.bannerImage + ")"}}>
          <Container maxWidth="md">
               <Box style={{padding: "0px 15px",}}>
                    <Stack direction="row" alignItems="flex-end" justify-content="flex-start">
            
                        <Avatar className={classes.avatar} sx={{[theme.breakpoints.up('xs')]: {
                            display: "none",
                        },
                        [theme.breakpoints.up('sm')]: {
                            display: "block",
                            width: "120px", height: "120px",
                            marginRight: "1.5em",
                        }
                        }} src={props.restaurant.profileImage}/>
                        <Typography variant="h3" component="h1" style={{color: "white", paddingBottom: "5px",}}>
                            {props.restaurant.name}
                        </Typography>
                        
                    </Stack>
                </Box>
          </Container>
      </div>

  );
}


export default BannerSection;
