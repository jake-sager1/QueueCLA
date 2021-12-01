import { Typography, Box, Container, CardActions, Stack, Paper, Button, IconButton, TextField, Grid, Select, MenuItem, Card, CardActionArea, CardMedia, CardContent, Alert } from '@mui/material';
import React from 'react';
import useStyles from '../user-styles';
import EditIcon from '@mui/icons-material/Edit';
import MenuChip from '../../../GlobalComponents/Chips';
import { Link } from 'react-router-dom';
import validator from 'validator';


class UserName extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            nameFieldValue: props.user.name,
            isNameValid: true,
        }
    }

    toggleEdit() {
        if (this.state.editable) {
            this.setState({
                editable: false,
            });
        } else {
            this.setState({
                editable: true,
            });
        }
    }

    handleCancel() {
        this.toggleEdit();
        this.setState({
            nameFieldValue: this.props.user.name,
        })
    }

    handleSave() {
        console.log(this.state);
        //edit user
        let change = { "name": this.state.nameFieldValue };
        editUser(this.props.user.id, change)
            .then(() => {
                this.props.changeUserData(change);
                this.toggleEdit();
            });
    }

    checkNameValidity(name) {
        if (validator.isAscii(name) && (/[a-zA-Z]/.test(name) || /\d/.test(name)) && name.length <= 50) {
            this.setState({
                isNameValid: true
            })
        } else {
            this.setState({
                isNameValid: false
            })
        }
    }

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{ backgroundColor: "#eee" }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        Name:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                        {!this.state.editable &&
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="p">
                                    {this.state.nameFieldValue}
                                </Typography>
                                <IconButton onClick={this.toggleEdit.bind(this)}>
                                    <EditIcon style={{ fontSize: "medium" }} />
                                </IconButton>
                            </Stack>
                        }
                        {this.state.editable &&
                            <Stack direction="row" spacing={1}>
                                <TextField value={this.state.nameFieldValue}
                                    variant="outlined"
                                    size="small"
                                    label="Name"
                                    onChange={(e) => {
                                        this.setState({
                                            nameFieldValue: e.target.value
                                        }, () => {
                                            this.checkNameValidity(e.target.value)
                                        })
                                    }}
                                    error={!this.state.isNameValid}
                                    helperText={this.state.isNameValid ? "" : "Enter a valid name."}
                                />
                                <Button disabled={!this.state.isNameValid} variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
                                <Button variant="contained" style={{ backgroundColor: "darkRed" }}
                                    onClick={this.handleCancel.bind(this)}>Cancel</Button>
                            </Stack>
                        }
                    </Stack>
                </Stack>
            </Paper>
        );
    }
}

class Identification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            nameFieldValue: props.user.uid,
            isUIDValid: true,
            duplicate_UID_entered: false,
        }
    }

    toggleEdit() {
        if (this.state.editable) {
            this.setState({
                editable: false,
            });
        } else {
            this.setState({
                editable: true,
            });
        }
    }

    handleCancel() {
        this.toggleEdit();
        this.setState({
            nameFieldValue: this.props.user.uid,
        })
    }

    handleSave() {
        let change = { "uid": this.state.nameFieldValue };
        editUser(this.props.user.id, change)
            .then((statusCode) => {
                if (statusCode !== 409) {
                    this.triggerDuplicateUID(false)
                    this.toggleEdit();
                    this.props.changeUserData(change);
                } else {
                    this.triggerDuplicateUID(true)
                }
            });
    }

    triggerDuplicateUID(boolean_value) {
        this.setState({
            duplicate_UID_entered: boolean_value
        })
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

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{ backgroundColor: "#eee" }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        UID:
                    </Typography>
                    {
                        this.state.duplicate_UID_entered ? (
                            <Alert severity="error">That UID belongs to another student. Please enter your UID.</Alert>
                        ) : (<span></span>)
                    }
                    <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                        {!this.state.editable &&
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="p">
                                    {this.state.nameFieldValue}
                                </Typography>
                                <IconButton onClick={this.toggleEdit.bind(this)}>
                                    <EditIcon style={{ fontSize: "medium" }} />
                                </IconButton>
                            </Stack>
                        }
                        {this.state.editable &&
                            <Stack direction="row" spacing={1}>
                                <TextField value={this.state.nameFieldValue}
                                    variant="outlined"
                                    size="small"
                                    label="UID"
                                    onChange={(e) => {
                                        this.setState({
                                            nameFieldValue: e.target.value
                                        }, () => {
                                            this.checkUIDValidity(e.target.value)
                                        });
                                    }}
                                    error={!this.state.isUIDValid}
                                    helperText={this.state.isUIDValid ? "" : "Enter a valid 9 digit UID."}
                                />
                                <Button disabled={!this.state.isUIDValid} variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
                                <Button variant="contained" style={{ backgroundColor: "darkRed" }}
                                    onClick={this.handleCancel.bind(this)}>Cancel</Button>
                            </Stack>
                        }
                    </Stack>
                </Stack>
            </Paper>
        );
    }
}

class Email extends React.Component {

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{ backgroundColor: "#eee" }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        Email:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="p">
                                {this.props.user.email}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        );
    }
}

function CardRender(props) {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={"/restaurants/" + props.id} className={classes.cardActionArea}>
                <CardMedia className={classes.cardMedia} image={props.restaurants[props.id].bannerImage} title="Image Title"></CardMedia>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                        {props.restaurants[props.id].name}
                    </Typography>
                    <Typography color="textSecondary">
                        {props.restaurants[props.id].description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Stack className={classes.chips} direction="row" spacing={1}
                            style={{overflow: "scroll",}}>
                        {props.restaurants[props.id].chips.map((name) =>
                            <MenuChip name={name}
                                onClick={null}
                                variant="outlined" />
                        )}
                    </Stack>
                </CardActions>
            </CardActionArea>

        </Card>
    );

}

class Favorites extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{ backgroundColor: "#eee" }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        Favorite Restaurants:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                        <Stack direction="row" spacing={1} alignItems="center">

                            <Box sx={{flexGrow: 1}}>
                                <Grid container spacing={2} alignItems="stretch">
                                    {this.props.user.favorites.map((id) => (
                                        <Grid item key={id} xs={12} sm={6} md={4} style={{minWidth: "250px"}}>

                                            <CardRender id={id} restaurants={this.props.restaurants} />


                                        </Grid>
                                    ))}

                                </Grid>
                            </Box>


                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        );
    }
}

function UserDisplay(props) {

    const classes = useStyles();

    return (
        <div class={classes.mainPage}>
            <Container maxWidth="md">
                <Stack direction="column" spacing={2}>
                    <Typography variant="h3">{props.user.name}'s Profile</Typography>
                    <Paper className={classes.settingsPaper}>
                        <Stack direction="column" spacing={2}>
                            <UserName user={props.user} classes={classes} changeUserData={props.changeUserData} />
                            <Identification user={props.user} classes={classes} changeUserData={props.changeUserData} />
                            <Email user={props.user} classes={classes} />
                            <Favorites user={props.user} restaurants={props.restaurants} classes={classes} />
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </div>
    )
}

async function editUser(id, editProps) {
    const body = {
        data: editProps,
        id: id
    }
    console.log("Printing body: ", body)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    let statusCodeReceived = await fetch('http://localhost:5001/user/edit', requestOptions)
        .then(response => response.json())
        .then(data => {  
            return data.statusCode
        });

    return statusCodeReceived
}

export default UserDisplay;
