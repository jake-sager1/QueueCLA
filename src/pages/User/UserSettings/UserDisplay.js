import { Typography, Container, Stack, Paper, Button, IconButton, TextField, Grid, Select, MenuItem } from '@mui/material';
import React from 'react';
import useStyles from '../user-styles';
import EditIcon from '@mui/icons-material/Edit';
import MenuChip from '../../../GlobalComponents/Chips';

class UserName extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            nameFieldValue: props.user.name,
        }
    }

    toggleEdit() {
        if(this.state.editable)
        {
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
        this.toggleEdit();
    }

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{backgroundColor: "#eee"}}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{fontWeight: "bold"}}>
                        Name:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                        {!this.state.editable &&
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="p">
                                    {this.props.user.name}
                                </Typography>
                                <IconButton onClick={this.toggleEdit.bind(this)}>
                                    <EditIcon style={{fontSize: "medium"}}/>
                                </IconButton>
                            </Stack>
                        }
                        {this.state.editable &&
                            <Stack direction="row" spacing={1}>
                                <TextField value={this.state.nameFieldValue}
                                    variant="outlined"
                                    size="small"
                                    label="Name"
                                    onChange={(e) => {this.setState({nameFieldValue: e.target.value,})}}
                                    />
                                <Button variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
                                <Button variant="contained" style={{backgroundColor: "darkRed"}}
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
            nameFieldValue: props.user.id,
        }
    }

    toggleEdit() {
        if(this.state.editable)
        {
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
            nameFieldValue: this.props.user.id,
        })
    }

    handleSave() {
        this.toggleEdit();
    }

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{backgroundColor: "#eee"}}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{fontWeight: "bold"}}>
                        UID:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{marginLeft: "10px"}}>
                        {!this.state.editable &&
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="p">
                                    {this.props.user.id}
                                </Typography>
                                <IconButton onClick={this.toggleEdit.bind(this)}>
                                    <EditIcon style={{fontSize: "medium"}}/>
                                </IconButton>
                            </Stack>
                        }
                        {this.state.editable &&
                            <Stack direction="row" spacing={1}>
                                <TextField value={this.state.nameFieldValue}
                                    variant="outlined"
                                    size="small"
                                    label="Name"
                                    onChange={(e) => {this.setState({nameFieldValue: e.target.value,})}}
                                    />
                                <Button variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
                                <Button variant="contained" style={{backgroundColor: "darkRed"}}
                                        onClick={this.handleCancel.bind(this)}>Cancel</Button>
                            </Stack>
                        }
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
                            <UserName user={props.user} classes={classes}/>
                            <Identification user={props.user} classes={classes}/>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </div>
    )
}

export default UserDisplay;
