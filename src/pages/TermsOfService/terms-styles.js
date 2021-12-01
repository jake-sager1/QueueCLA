import { autocompleteClasses } from '@mui/material';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
    },
    homeNavBar: {
        padding: "20px",
    },
    mainPageText: {
        marginTop: "70px",
    },
    secondSection: {
        paddingTop: "100px",
        paddingBottom: "100px",
    },
    logo: {
        color: "black",
    },
    page: {
        backgroundColor: "#3d3d3d",
        height: "100vh"
    },
    image404: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        maxHeight: "500px",
        border: "none"
    },
    mainbackground: {
        backgroundColor: "#5794A7"
    },
    displaypic: {
        border: "none",
        borderRadius: "50%",
        width: "75px",
        height: "75px"
    },
    contained: {
        paddingTop: "75px",
        paddingBottom: "75px",
    },
}));

export default useStyles;