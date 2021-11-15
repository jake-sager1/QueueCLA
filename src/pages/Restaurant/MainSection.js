import React from 'react'
import useStyles from './restaurant-styles'
import { Typography, Stack, Box, Chip, Paper, Button, Container, Avatar, Divider } from '@mui/material'
import { DinnerDiningSharpIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import DinnerDiningSharp from '@mui/icons-material/DinnerDiningSharp';
import theme from '../../theme';
import JoinLineSection from './JoinLineSection';
import ContactSection from './ContactSection';

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
                                    Today's Hours: {props.restaurant.hours.Thursday}
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
                    <Paper className={classes.linePaper}>
                        <Stack direction="column" spacing={4}>
                            <JoinLineSection restaurant={props.restaurant}/>
                            <Divider/>
                            <ContactSection restaurant={props.restaurant}/>
                        </Stack>
                    </Paper>
                </Stack>
          </Container>
      </div>

  );
}


export default MainSection;
