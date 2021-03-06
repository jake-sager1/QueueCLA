import { Typography, Container, Stack, Paper, Button, IconButton, TextField, Grid, Select, MenuItem, Alert } from '@mui/material';
import React from 'react';
import useStyles from '../Restaurant/restaurant-styles';
import EditIcon from '@mui/icons-material/Edit';
import Header from './Header';
import Footer from '../../GlobalComponents/Footer';
import { spacing } from '@mui/system';
import { auth } from '../../service/firebase'

async function editUser(id, editProps) {
    const body = {
        data: editProps,
        id: id
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    let statusCodeReceived = await fetch('http://localhost:5001/user/edit', requestOptions)
        .then(response => response.json())
        .then(data => { 
            console.log(data)
            return data.statusCode
        });
    return statusCodeReceived
}

class UserRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            yearValue: 2025,
            isUIDValid: true,
            duplicate_UID_entered: false,
        };
    }

    checkUIDValidity(uid) {
        if (/^\d+$/.test(uid) && uid.length === 9) {
            this.setState({
                isUIDValid: true
            })
        } else {
            this.setState({
                isUIDValid: false
            })
        }
    }

    isButtonDisabled() {
        return this.state.user.uid === null || !this.state.user.uid || !this.state.isUIDValid
    }

    triggerDuplicateUID(boolean_value) {
        this.setState({
            duplicate_UID_entered: boolean_value
        })
    }

    render() {
        return (
            <Stack direction="column" spacing={3}>
                <Typography spacing={5}></Typography>
                <Typography spacing={3} variant="h5" style={{ fontWeight: "bold" }}>Welcome, {this.state.user.name}</Typography>
                <Typography spacing={3} variant="h7">We just need a little more information before you get started...</Typography>
                {
                    this.state.duplicate_UID_entered ? (
                        <Alert severity="error">That UID belongs to another student. Please enter your UID.</Alert>
                    ) : (<span></span>)
                }
                <TextField value={this.state.user.uid}
                    onChange={(e) => {
                        let user = this.state.user;
                        user.uid = e.target.value;
                        this.setState({ 
                            user: user 
                        }, () => {
                            this.checkUIDValidity(e.target.value)
                        });
                    }}
                    error={!this.state.isUIDValid}
                    helperText={this.state.isUIDValid ? "" : "Enter a valid 9 digit UID."}
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} id="outlined-error" label="UCLA UID" input="number" variant="outlined" />
                <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                    <Typography spacing={3} variant="p">Graduation Year</Typography>
                    <Select value={this.state.yearValue}
                        variant="outlined"
                        size="small"
                        label="Graduation Year"
                        style={{ width: "150px", }}
                        spacing={3}
                        onChange={(e) => {
                            let user = this.state.user;
                            user.year = e.target.value;
                            this.setState({ yearValue: e.target.value })
                        }}
                    >
                        <MenuItem value={2025}>2025</MenuItem>
                        <MenuItem value={2024}>2024</MenuItem>
                        <MenuItem value={2023}>2023</MenuItem>
                        <MenuItem value={2022}>2022</MenuItem>
                    </Select>
                </Stack>
                <Button disabled={this.isButtonDisabled()} spacing={5} align="center" variant="contained" onClick={() => {
                    let change = { uid: this.state.user.uid, year: this.state.user.year, setup: true };
                    editUser(this.state.user.id, change)
                        .then((statusCode) => {
                            if (statusCode !== 409) {
                                this.triggerDuplicateUID(false)
                                this.props.changeUserData(change);
                            } else { 
                                this.triggerDuplicateUID(true)
                            }
                        });
                }}>Register</Button>
            </Stack>
        );
    }
}

function UserSignup(props) {

    const classes = useStyles();

    return (
        <div class={classes.page}>
            <Header />
            <div class={classes.mainPage}>
                <Container maxWidth="md">
                    <Stack direction="column" spacing={2}>
                        <Paper className={classes.settingsPaper} style={{ padding: "20px" }}>
                            <Stack spacing={2} direction="column">
                                <Stack direction="column" spacing={5} sx={{ mb: 3 }}>
                                    <UserRegister classes={classes} user={props.user} changeUserData={props.changeUserData} />
                                </Stack>
                            </Stack>
                        </Paper>
                    </Stack>
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default UserSignup;
