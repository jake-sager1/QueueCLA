import { Typography, Container, Stack, Paper, Button, IconButton, TextField, Grid, Select, MenuItem, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import React from 'react';
import useStyles from '../user-styles';
import EditIcon from '@mui/icons-material/Edit';
import MenuChip from '../../../GlobalComponents/Chips';
import { Link } from 'react-router-dom';


class UserName extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            nameFieldValue: props.user.name,
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
                                    onChange={(e) => { this.setState({ nameFieldValue: e.target.value }) }}
                                />
                                <Button variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
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
            .then(() => {
                this.toggleEdit();
                this.props.changeUserData(change);
            });
    }

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{ backgroundColor: "#eee" }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        UID:
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
                                    label="UID"
                                    onChange={(e) => {
                                        this.setState({ nameFieldValue: e.target.value });
                                    }}
                                />
                                <Button variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
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

                <Stack className={classes.chips} direction="row" spacing={1}>
                    {props.restaurants[props.id].chips.map((name) =>
                        <MenuChip name={name}
                            onClick={null}
                            variant="outlined" />
                    )}
                </Stack>

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


                            <Grid container spacing={2} alignItems="stretch">
                                {this.props.user.favorites.map((id) => (
                                    <Grid item key={id} xs={12} sm={6} md={4}>

                                        <CardRender id={id} restaurants={this.props.restaurants} />

                                    </Grid>
                                ))}
                            </Grid>


                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        );
    }
}

function UserDisplay(props) {

    const classes = useStyles();

    let editName = false;

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
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    fetch('http://localhost:5001/user/edit', requestOptions)
        .then(response => response.json())
        .then(data => { console.log(data) });
}

export default UserDisplay;
