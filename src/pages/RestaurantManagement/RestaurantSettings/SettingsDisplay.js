import { Typography, Container, Stack, Paper, Box, IconButton } from '@mui/material';
import React from 'react';
import useStyles from '../restaurant-styles';
import EditIcon from '@mui/icons-material/Edit';

function SettingsDisplay(props) {

    const classes = useStyles();
    
    let editName = false;


    return (
        <div class={classes.mainPage}>
            <Container maxWidth="md">
                <Stack direction="column" spacing={2}>
                    <Typography variant="h3">Restaurant Settings</Typography>
                    <Paper className={classes.settingsPaper}>
                        <Stack direction="column" spacing={2}>
                            <Paper className={classes.lineEntry} style={{backgroundColor: "#eee"}}>
                                <Stack direction="column" spacing={1}>
                                    <Typography variant="h5" style={{fontWeight: "bold"}}>
                                        Name:
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                                        <Typography variant="p">
                                            {props.restaurant.name}
                                        </Typography>
                                        <IconButton>
                                            <EditIcon style={{fontSize: "medium"}}/>
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Paper>
                            <Paper className={classes.lineEntry} style={{backgroundColor: "#eee"}}>
                                <Stack direction="column" spacing={1}>
                                    <Typography variant="h5" style={{fontWeight: "bold"}}>
                                        Description:
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                                        <Typography variant="p">
                                            {props.restaurant.description}
                                        </Typography>
                                        <IconButton>
                                            <EditIcon style={{fontSize: "medium"}}/>
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Paper>
                            <Paper className={classes.lineEntry} style={{backgroundColor: "#eee"}}>
                                <Stack direction="column" spacing={1}>  
                                    <Typography variant="h5" style={{fontWeight: "bold"}}>
                                        Hours:
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                                        <Stack direction="column" spacing={1}>
                                            {Object.entries(props.restaurant.hours).map(([day, hours]) => (
                                                <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}> 
                                                    <Typography variant="p" style={{width: "110px"}}>
                                                        {day + ":"}
                                                    </Typography>
                                                    <Typography variant="p">
                                                        {hours}
                                                    </Typography>
                                                    <IconButton>
                                                        <EditIcon style={{fontSize: "medium"}}/>
                                                    </IconButton>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </div>
    )
}

export default SettingsDisplay;