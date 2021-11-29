import { Typography, Container, Stack, Paper, Button, IconButton, TextField, Grid, Select, MenuItem } from '@mui/material';
import React from 'react';
import useStyles from '../Restaurant/restaurant-styles';
import EditIcon from '@mui/icons-material/Edit';
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import { spacing } from '@mui/system';
import {auth} from '../../service/firebase'

class UserRegister extends React.Component {
    render(){
        return(
            <Stack direction="column" spacing={3}>
                <Typography spacing={5}></Typography>
                <Typography spacing={3} variant="h5" style={{fontWeight: "bold"}}>Welcome, USER NAME!</Typography>
                <Typography spacing={3} variant="h7">We just need a little more information before you get started...</Typography>
                <TextField sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }, }} id="outlined-error" label="UCLA UID" input="number" variant="outlined" />
                <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                    <Typography spacing={3} variant="p">Graduation Year</Typography>
                    <Select value={0.25}
                        variant="outlined" 
                        size="small" 
                        label="Graduation Year"
                        style={{width: "150px",}}
                        spacing={3}
                        onChange={(e) => {this.setState({avgWaitSelection: e.target.value,})}}
                        >
                        <MenuItem value={0.25}>2025</MenuItem>
                        <MenuItem value={0.5}>2024</MenuItem>
                        <MenuItem value={1}>2023</MenuItem>
                        <MenuItem value={2}>2022</MenuItem>
                    </Select>
                </Stack>
                <Button spacing={5} align="center" variant="contained" onClick={this.props.setSetup}>Register</Button>
            </Stack>
        );
    }
}

function UserSignup(props) {

    const classes = useStyles();
    return (
        <div class={classes.page}>
            <Header/>
            <div class={classes.mainPage}>
                <Container maxWidth="md">
                    <Stack direction="column" spacing={2}>
                        <Paper className={classes.settingsPaper} style={{padding: "20px"}}>
                            <Stack spacing={2} direction="column">
                                <Stack direction="column" spacing={5} sx={{ mb: 3 }}>
                                    <UserRegister setSetup={props.setSetup} classes={classes}/>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Stack>
                </Container>
            </div>
            <Footer/>
        </div>
    );
}

export default UserSignup;
