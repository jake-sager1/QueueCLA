import { Typography, Container, Stack, Paper, Button, IconButton, TextField, Grid, Select, MenuItem, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Close from '@mui/icons-material/Close'
import React from 'react';
import useStyles from '../restaurant-styles';
import EditIcon from '@mui/icons-material/Edit';
import MenuChip from '../../../GlobalComponents/Chips';
import validator from 'validator';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { signOutWithGoogle } from '../../../service/firebase'

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.default,
            width: props.width,
            height: props.height,
            type: props.type,
            percentUploaded: 0,
            showPercentage: false,
        };
        this.onImageChange = this.onImageChange.bind(this);
    }

    onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.handleSave(event, img);
            this.setState({ showPercentage: true });
        }
    };

    handleProfileImageFirebaseUpload(event, img) {
        const storage = getStorage();
        const oldURL = this.state.image;
        event.preventDefault();
        if (img === '') {
            alert("File was not an image. Please upload a .png or .jpg image.");
        }
        const storageRef = ref(storage, '/profile-images/' + this.props.restaurant.id + '/' + img.name);
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const percentUploaded = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({ percentUploaded: percentUploaded });

            }, (error) => {
                console.log(error);
            }, () => {
                console.log("uploaded file");
                this.setState({ showPercentage: false });
                getDownloadURL(storageRef)
                    .then(firebaseURL => {
                        let change = { "profileImage": firebaseURL };
                        editUser(this.props.restaurant.id, change)
                            .then(() => {
                                this.props.changeUserData(change);
                            });
                        this.setState({ image: firebaseURL });
                    });

            });

        const refToDelete = ref(storage, oldURL)
        deleteObject(refToDelete).then(() => {
            // File deleted successfully
            console.log("deleted old image");
        }).catch((error) => {
            console.log("error with deleting old image");
            // Uh-oh, an error occurred!
        });


    }

    handleBannerImageFirebaseUpload(event, img) {
        const storage = getStorage();
        const oldURL = this.state.image;
        event.preventDefault();
        if (img === '') {
            alert("File was not an image. Please upload a .png or .jpg image.");
        }
        const storageRef = ref(storage, '/banner-images/' + this.props.restaurant.id + '/' + img.name);
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const percentUploaded = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({ percentUploaded: percentUploaded });

            }, (error) => {
                console.log(error);
            }, () => {
                console.log("uploaded file");
                this.setState({ showPercentage: false });
                getDownloadURL(storageRef)
                    .then(firebaseURL => {
                        let change = { "bannerImage": firebaseURL };
                        editUser(this.props.restaurant.id, change)
                            .then(() => {
                                this.props.changeUserData(change);
                            });
                        this.setState({ image: firebaseURL });
                    });

            });

        const refToDelete = ref(storage, oldURL);
        deleteObject(refToDelete).then(() => {
            // File deleted successfully
            console.log("deleted old image");
        }).catch((error) => {
            console.log("error with deleting old image");
            // Uh-oh, an error occurred!
        });

    }

    handleSave(event, img) {
        if (this.state.type === "Profile") {
            this.handleProfileImageFirebaseUpload(event, img);
        } else {
            this.handleBannerImageFirebaseUpload(event, img);
        }
    }

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{ backgroundColor: "#eee" }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        Select a {this.state.type} Photo:
                    </Typography>
                    <div>
                        <div>
                            {this.state.type === "Profile" &&
                                <img width={this.state.width} height={this.state.height} src={this.state.image}
                                    style={{ borderRadius: "100%" }} />}
                            {this.state.type === "Banner" &&
                                <img width={this.state.width} height={this.state.height} src={this.state.image} />}
                            <div>
                                <Button variant="contained" style={{ marginTop: "10px" }}><label for={this.state.type} style={{ cursor: "pointer" }}>Upload Image</label></Button>
                                <input type="file" style={{ display: "none" }} id={this.state.type} name="myImage" onChange={this.onImageChange} accept=".png,.jpg" />
                            </div>
                        </div>
                    </div>
                    <Typography style={this.state.showPercentage ? { display: "block" } : { display: "none" }}>{this.state.percentUploaded.toFixed(2)}% uploaded</Typography>
                </Stack>
            </Paper>
        );
    }
}

class RestaurantName extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            nameFieldValue: props.restaurant.name,
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
            nameFieldValue: this.props.restaurant.name,
        })
    }

    handleSave() {
        let change = { "name": this.state.nameFieldValue };
        editUser(this.props.restaurant.id, change)
            .then(() => {
                this.toggleEdit();
                this.props.changeUserData(change);
            });
    }

    checkNameValidity(name) {
        if (validator.isAscii(name) && (/[a-zA-Z]/.test(name) || /\d/.test(name)) && name.length <= 50) {
            this.setState({
                isNameValid: true
            }, this.checkFormValidity)
        } else {
            this.setState({
                isNameValid: false
            }, this.checkFormValidity)
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
                                    {this.props.restaurant.name}
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
                                            nameFieldValue: e.target.value,
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

class RestaurantDescription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            descriptionFieldValue: props.restaurant.description,
            isDescriptionValid: true,
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
            descriptionFieldValue: this.props.restaurant.description,
        });
    }

    handleSave() {
        let change = { "description": this.state.descriptionFieldValue };
        editUser(this.props.restaurant.id, change)
            .then(() => {
                this.toggleEdit();
                this.props.changeUserData(change);
            });
    }

    checkDescriptionValidity(description) {
        if (validator.isAscii(description) && (/[a-zA-Z]/.test(description) || /\d/.test(description)) && description.length >= 10 && description.length <= 100) {
            this.setState({
                isDescriptionValid: true
            })
        } else {
            this.setState({
                isDescriptionValid: false
            })
        }
    }

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{ backgroundColor: "#eee" }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        Description:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                        {!this.state.editable &&
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="p">
                                    {this.props.restaurant.description}
                                </Typography>
                                <IconButton onClick={this.toggleEdit.bind(this)}>
                                    <EditIcon style={{ fontSize: "medium" }} />
                                </IconButton>
                            </Stack>
                        }
                        {this.state.editable &&
                            <Stack direction="row" spacing={1}>
                                <TextField value={this.state.descriptionFieldValue}
                                    variant="outlined"
                                    size="small"
                                    label="Description"
                                    style={{ width: "400px", }}
                                    onChange={(e) => {
                                        this.setState({
                                            descriptionFieldValue: e.target.value,
                                        }, () => {
                                            this.checkDescriptionValidity(e.target.value)
                                        })
                                    }}
                                    error={!this.state.isDescriptionValid}
                                    helperText={this.state.isDescriptionValid ? "" : "Enter a valid description with at least 10 characters."}
                                />
                                <Button disabled={!this.state.isDescriptionValid} variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
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

class RestaurantEmail extends React.Component {

    constructor(props) {
        super(props);
    }

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
                                {this.props.restaurant.email}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        );
    }
}

class RestaurantPhone extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            phoneValue: props.restaurant.phone,
            isPhoneValid: true,
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
            phoneValue: this.props.restaurant.phone,
        })
    }

    handleSave() {
        let change = { "phone": this.state.phoneValue };
        editUser(this.props.restaurant.id, change)
            .then(() => {
                this.toggleEdit();
                this.props.changeUserData(change);
            });
    }

    checkPhoneValidity(phone_number) {
        if (validator.isMobilePhone(phone_number) && phone_number.length === 10) {
            this.setState({
                isPhoneValid: true
            })
        } else {
            this.setState({
                isPhoneValid: false
            })
        }
    }

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{ backgroundColor: "#eee" }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        Phone:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                        {!this.state.editable &&
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="p">
                                    {this.props.restaurant.phone}
                                </Typography>
                                <IconButton onClick={this.toggleEdit.bind(this)}>
                                    <EditIcon style={{ fontSize: "medium" }} />
                                </IconButton>
                            </Stack>
                        }
                        {this.state.editable &&
                            <Stack direction="row" spacing={1}>
                                <TextField value={this.state.phoneValue}
                                    variant="outlined"
                                    size="small"
                                    label="Phone Number"
                                    onChange={(e) => {
                                        this.setState({
                                            phoneValue: e.target.value,
                                        }, () => {
                                            this.checkPhoneValidity(e.target.value)
                                        })
                                    }}
                                    error={!this.state.isPhoneValid}
                                    helperText={this.state.isPhoneValid ? "" : "Enter a valid 10 digit phone number."}
                                />
                                <Button disabled={!this.state.isPhoneValid} variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
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


class RestaurantWebsite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            websiteValue: props.restaurant.url,
            isWebsiteValid: true,
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
            websiteValue: this.props.restaurant.url,
        })
    }

    handleSave() {
        let change = { "url": this.state.websiteValue };
        editUser(this.props.restaurant.id, change)
            .then(() => {
                this.toggleEdit();
                this.props.changeUserData(change);
            });
    }

    checkWebsiteValidity(website_url) {
        let result = website_url.match(/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm)
        if (result !== null) {
            this.setState({
                isWebsiteValid: true
            })
        } else {
            this.setState({
                isWebsiteValid: false
            })
        }
    }

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{ backgroundColor: "#eee" }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        Website:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                        {!this.state.editable &&
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="p">
                                    {this.props.restaurant.url}
                                </Typography>
                                <IconButton onClick={this.toggleEdit.bind(this)}>
                                    <EditIcon style={{ fontSize: "medium" }} />
                                </IconButton>
                            </Stack>
                        }
                        {this.state.editable &&
                            <Stack direction="row" spacing={1}>
                                <TextField value={this.state.websiteValue}
                                    variant="outlined"
                                    size="small"
                                    label="Website URL"
                                    onChange={(e) => {
                                        this.setState({
                                            websiteValue: e.target.value,
                                        }, () => {
                                            this.checkWebsiteValidity(e.target.value)
                                        })
                                    }}
                                    error={!this.state.isWebsiteValid}
                                    helperText={this.state.isWebsiteValid ? "" : "Enter a valid website URL."}
                                />
                                <Button disabled={!this.state.isWebsiteValid} variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
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

class HourEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            openTimeSelection: this.props.restaurant.hours[this.props.day].open,
            openTimeHalf: this.props.restaurant.hours[this.props.day].openHalf,
            closeTimeSelection: this.props.restaurant.hours[this.props.day].close,
            closeTimeHalf: this.props.restaurant.hours[this.props.day].closeHalf,
        }
    }

    timeOptions = [
        "12:00",
        "12:30",
        "1:00",
        "1:30",
        "2:00",
        "2:30",
        "3:00",
        "3:30",
        "4:00",
        "4:30",
        "5:00",
        "5:30",
        "6:00",
        "6:30",
        "7:00",
        "7:30",
        "8:00",
        "8:30",
        "9:00",
        "9:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
    ]

    toggleEdit() {
        if (this.state.editable) {
            this.setState({ editable: false });
        } else {
            this.setState({ editable: true });
        }
    }

    handleCancel() {
        this.setState({
            editable: false,
            openTimeSelection: this.props.restaurant.hours[this.props.day].open,
            openTimeHalf: this.props.restaurant.hours[this.props.day].openHalf,
            closeTimeSelection: this.props.restaurant.hours[this.props.day].close,
            closeTimeHalf: this.props.restaurant.hours[this.props.day].closeHalf,
        })
    }

    handleSave() {
        let hours = this.props.restaurant.hours;
        hours[this.props.day].open = this.state.openTimeSelection;
        hours[this.props.day].openHalf = this.state.openTimeHalf;
        hours[this.props.day].close = this.state.closeTimeSelection;
        hours[this.props.day].closeHalf = this.state.closeTimeHalf;
        let change = {
            "hours": hours
        };
        editUser(this.props.restaurant.id, change)
            .then(() => {
                this.toggleEdit();
                this.props.changeUserData(change);
            });
    }

    handleOpenChange(val) {
        this.setState({
            openTimeSelection: val,
        })
    }

    handleOpenHalfChange(val) {
        this.setState({
            openTimeHalf: val,
        })
    }

    handleCloseChange(val) {
        this.setState({
            closeTimeSelection: val,
        })
    }

    handleCloseHalfChange(val) {
        this.setState({
            closeTimeHalf: val,
        })
    }

    render() {
        return (
            <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
                <Typography variant="p" style={{ width: "110px" }}>
                    {this.props.day + ":"}
                </Typography>
                {!this.state.editable &&
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="p">
                            {this.props.restaurant.hours[this.props.day].open +
                                this.props.restaurant.hours[this.props.day].openHalf +
                                " - " +
                                this.props.restaurant.hours[this.props.day].close +
                                this.props.restaurant.hours[this.props.day].closeHalf}
                        </Typography>
                        <IconButton onClick={this.toggleEdit.bind(this)}>
                            <EditIcon style={{ fontSize: "medium" }} />
                        </IconButton>
                    </Stack>
                }
                {this.state.editable &&
                    <Stack direction="column" spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography>Open:</Typography>
                            <Select size="small" value={this.state.openTimeSelection}
                                onChange={(event) => this.handleOpenChange(event.target.value)}>
                                {this.timeOptions.map((time) => (
                                    <MenuItem value={time}>{time}</MenuItem>
                                ))}
                            </Select>
                            <Select size="small" value={this.state.openTimeHalf}
                                onChange={(event) => this.handleOpenHalfChange(event.target.value)}>
                                <MenuItem value="am">am</MenuItem>
                                <MenuItem value="pm">pm</MenuItem>
                            </Select>
                            <Button variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
                            <Button variant="contained" style={{ backgroundColor: "darkRed" }}
                                onClick={this.handleCancel.bind(this)}>Cancel</Button>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography>Close:</Typography>
                            <Select size="small" value={this.state.closeTimeSelection}
                                onChange={(event) => this.handleCloseChange(event.target.value)}>
                                {this.timeOptions.map((time) => (
                                    <MenuItem value={time}>{time}</MenuItem>
                                ))}
                            </Select>
                            <Select size="small" value={this.state.closeTimeHalf}
                                onChange={(event) => this.handleCloseHalfChange(event.target.value)}>
                                <MenuItem value="am">am</MenuItem>
                                <MenuItem value="pm">pm</MenuItem>
                            </Select>
                        </Stack>
                    </Stack>
                }
            </Stack>
        );
    }
}

class RestaurantHours extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        const daysOfWeek = ["Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"];

        return (
            <Paper className={this.props.classes.lineEntry} style={{ backgroundColor: "#eee" }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        Hours:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                        <Stack direction="column" spacing={1}>
                            {daysOfWeek.map((day) => (
                                <HourEntry key={day} day={day} restaurant={this.props.restaurant} changeUserData={this.props.changeUserData} />
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        );
    }
}

class RestaurantWaitTime extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editable: false,
            avgWaitSelection: this.props.restaurant.avgTimePerCustomer,
        }
    }

    toggleEdit() {
        if (!this.state.editable) {
            this.setState({ editable: true });
        } else {
            this.setState({ editable: false });
        }
    }

    handleSave() {
        let change = { "avgTimePerCustomer": this.state.avgWaitSelection };
        editUser(this.props.restaurant.id, change)
            .then(() => {
                this.toggleEdit();
                this.props.changeUserData(change);
            });
    }

    handleCancel() {
        this.toggleEdit();
        this.setState({
            avgWaitSelection: this.props.restaurant.avgTimePerCustomer,
        });
    }

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{ backgroundColor: "#eee" }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        Average wait time per customer:
                    </Typography>
                    {!this.state.editable &&
                        <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                            <Typography variant="p">
                                {this.props.restaurant.avgTimePerCustomer + " minutes"}
                            </Typography>
                            <IconButton onClick={this.toggleEdit.bind(this)}>
                                <EditIcon style={{ fontSize: "medium" }} />
                            </IconButton>
                        </Stack>
                    }
                    {this.state.editable &&
                        <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                            <Select value={this.state.avgWaitSelection}
                                variant="outlined"
                                size="small"
                                label="Description"
                                style={{ width: "150px", }}
                                onChange={(e) => { this.setState({ avgWaitSelection: e.target.value, }) }}
                            >
                                <MenuItem value={0.25}>15 seconds</MenuItem>
                                <MenuItem value={0.5}>30 seconds</MenuItem>
                                <MenuItem value={1}>1 minute</MenuItem>
                                <MenuItem value={2}>2 minutes</MenuItem>
                                <MenuItem value={3}>3 minutes</MenuItem>
                                <MenuItem value={4}>4 minutes</MenuItem>
                                <MenuItem value={5}>5 minutes</MenuItem>
                                <MenuItem value={10}>10 minutes</MenuItem>
                                <MenuItem value={15}>15 minutes</MenuItem>
                                <MenuItem value={20}>20 minutes</MenuItem>
                                <MenuItem value={25}>25 minutes</MenuItem>
                                <MenuItem value={30}>30 minutes</MenuItem>
                                <MenuItem value={45}>45 minutes</MenuItem>
                                <MenuItem value={60}>1 hour</MenuItem>
                            </Select>
                            <Button variant="contained" onClick={this.handleSave.bind(this)}>Save</Button>
                            <Button variant="contained" style={{ backgroundColor: "darkRed" }}
                                onClick={this.handleCancel.bind(this)}>Cancel</Button>
                        </Stack>
                    }
                </Stack>
            </Paper>
        );
    }
}

class RestaurantTags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedChips: this.props.restaurant.chips,
        }
    }

    chips = [
        "vegetarian", "vegan", "gluten-free", "breakfast", "lunch", "dinner",
        "fast-food", "takeout"
    ]

    handleClick(chip) {
        if (this.state.selectedChips.includes(chip)) {
            let newChips = this.state.selectedChips.filter(function (value, index, arr) { return arr.includes(value) && value != chip });
            this.setState({
                selectedChips: newChips,
            });
            let change = { "chips": newChips };
            editUser(this.props.restaurant.id, change)
                .then(() => {
                    this.props.changeUserData(change);
                });
        } else {
            let newChips = this.state.selectedChips.concat([chip]);
            this.setState({
                selectedChips: newChips,
            });
            let change = { "chips": newChips };
            editUser(this.props.restaurant.id, change)
                .then(() => {
                    this.props.changeUserData(change);
                });
        }
    }

    render() {
        return (
            <Paper className={this.props.classes.lineEntry} style={{ backgroundColor: "#eee" }}>
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        Restaurant Tags:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                        <Stack spacing={1} alignItems="center" direction="row" justifyContent="flex-start"
                            style={{ overflow: "scroll" }}>
                            {this.chips.map((name) =>
                                <MenuChip name={name}
                                    onClick={() => this.handleClick(name)}
                                    variant={this.state.selectedChips.includes(name) ? "filled" : "outlined"} />
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        );
    }
}

class RestaurantMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            menuValue: this.props.restaurant.menu,
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
            menuValue: this.props.restaurant.menu,
        })
    }

    handleSave() {
        let change = { "menu": this.state.menuValue };
        editUser(this.props.restaurant.id, change)
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
                        Menu:
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" style={{ marginLeft: "10px" }}>
                        {!this.state.editable &&
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="p">
                                    <pre style={{ fontFamily: "Roboto" }}>{this.state.menuValue}</pre>
                                </Typography>
                                <IconButton onClick={this.toggleEdit.bind(this)}>
                                    <EditIcon style={{ fontSize: "medium" }} />
                                </IconButton>
                            </Stack>
                        }
                        {this.state.editable &&
                            <Stack direction="row" spacing={1} alignItems="center">
                                <TextField value={this.state.menuValue}
                                    variant="outlined"
                                    multiline
                                    size="large"
                                    label="Menu"
                                    style={{ width: "600px" }}
                                    onChange={(e) => { this.setState({ menuValue: e.target.value, }) }}
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

class DeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this)
        this.state = {
            isDialogBoxVisible: false
        }
    }

    setDialogBoxVisibility(boolean_value) {
        this.setState({
            isDialogBoxVisible: boolean_value
        })
    }

    handleDelete() {
        deleteUser(this.props.restaurant.id)
            .then(() => {
                console.log('deleted from database');
                this.props.changeUserData(this.props.restaurant.id, {});
            });
    }

    render() {
        console.log(this.state)
        return (
            <Box textAlign="center">
                <Button
                    variant="contained"
                    style={{ backgroundColor: "darkRed", width: "175px" }}
                    onClick={() => {
                        this.setDialogBoxVisibility(true)
                    }}
                >
                    Delete Account
                </Button>
                {
                    this.state.isDialogBoxVisible ? (
                        <Dialog open={true} maxWidth="sm" fullWidth>
                            <DialogTitle>Do you want to delete your account?</DialogTitle>
                            <Box position="absolute" top={0} right={0}>
                                <IconButton>
                                    <Close onClick={() => { this.setDialogBoxVisibility(false) }} />
                                </IconButton>
                            </Box>
                            <DialogContent>
                                <Typography>This action cannot be undone.</Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" onClick={() => { this.setDialogBoxVisibility(false) }}>
                                    Cancel
                                </Button>
                                <Button variant="contained" style={{ backgroundColor: "darkRed" }} onClick={this.handleDelete}>
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    ) : (<span></span>)
                }
            </Box>
        )
    }
}

function SettingsDisplay(props) {

    const classes = useStyles();

    let editName = false;

    return (
        <div class={classes.mainPage}>
            <Container maxWidth="md">
                <Stack direction="column" spacing={2}>
                    <Typography variant="h3">{props.restaurant.name} Settings</Typography>
                    <Paper className={classes.settingsPaper}>
                        <Stack direction="column" spacing={2}>
                            <RestaurantName restaurant={props.restaurant} classes={classes} changeUserData={props.changeUserData} />
                            <RestaurantDescription restaurant={props.restaurant} classes={classes} changeUserData={props.changeUserData} />
                            <RestaurantEmail classes={classes} restaurant={props.restaurant} changeUserData={props.changeUserData} />
                            <RestaurantPhone classes={classes} restaurant={props.restaurant} changeUserData={props.changeUserData} />
                            <RestaurantWebsite classes={classes} restaurant={props.restaurant} changeUserData={props.changeUserData} />
                            <RestaurantHours restaurant={props.restaurant} classes={classes} changeUserData={props.changeUserData} />
                            <RestaurantWaitTime restaurant={props.restaurant} classes={classes} changeUserData={props.changeUserData} />
                            <RestaurantTags restaurant={props.restaurant} classes={classes} changeUserData={props.changeUserData} />
                            <RestaurantMenu restaurant={props.restaurant} classes={classes} changeUserData={props.changeUserData} />
                            <ImageUpload restaurant={props.restaurant} user={props.user} classes={classes} changeUserData={props.changeUserData}
                                default={props.restaurant.bannerImage}
                                width="700px" height="180px" type="Banner" />
                            <ImageUpload restaurant={props.restaurant} user={props.user} classes={classes} changeUserData={props.changeUserData}
                                default={props.restaurant.profileImage}
                                width="100px" height="100px" type="Profile" />
                            <DeleteButton restaurant={props.restaurant} changeUserData={props.changeUserData} />
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </div>
    )
}

async function deleteUser(id) {
    const body = {
        id: id
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    fetch('http://localhost:5001/restaurant/delete', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("Printing data after deletion: ", data)
        })
    signOutWithGoogle()
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
    fetch('http://localhost:5001/restaurant/edit', requestOptions)
        .then(response => response.json())
        .then(data => { console.log(data) });
}

export default SettingsDisplay;
