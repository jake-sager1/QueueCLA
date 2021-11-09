import React from 'react'
import useStyles from './restaurant-styles'
import { Typography, Stack, Box, Chip, Paper, Button, Container, Avatar } from '@mui/material'
import { DinnerDiningSharpIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import DinnerDiningSharp from '@mui/icons-material/DinnerDiningSharp';
import theme from '../../theme';


function MainSection(props) {

  const classes = useStyles();

  return (

      <div className={classes.mainSection}>
          <Container maxWidth="md">
                <Stack direction="column" spacing={5}>
                    <Box style={{padding: "0px 17px",}}>
                        <Stack direction="row" justifyContent="flex-start">
                            <Box sx={{[theme.breakpoints.up('xs')]: {
                                    width: "0",
                                },
                                [theme.breakpoints.up('sm')]: {
                                    width: "120px",
                                    marginRight: "2em",
                                }
                                }}/>
                            <Stack direction="column" spacing={1}>
                                <Typography>
                                    {props.restaurant.description}
                                </Typography>
                                    
                                <Typography style={{fontWeight: "bold"}}>
                                    Hours: {props.restaurant.hours}
                                </Typography>

                                <Stack className={classes.chips} direction="row" alignItems="center" spacing={1}>
                                    {props.restaurant.chips.map((chip) => (
                                        <Chip
                                            label={chip}
                                            icon={<DinnerDiningSharp fontSize="small"/>}
                                            />
                                    ))}
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                    <Stack direction="column">
                        <Paper className={classes.linePaper}>
                            <Stack direction="column" spacing={2}>
                                <Typography variant="h4">
                                    Join the Line
                                </Typography>
                                <Typography>
                                    {"There are currently "} 
                                    <Box component="span" display="inline" style={{fontWeight: "bold"}}>55</Box> 
                                    {" people in line right now."}
                                </Typography>
                                <Button variant="contained" style={{padding: "20px"}}>Get in Line</Button>
                            </Stack>
                        </Paper>
                    </Stack>
                </Stack>
          </Container>
      </div>

  );
}


export default MainSection;
