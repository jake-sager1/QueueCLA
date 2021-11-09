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
        maxHeight: "500px"
    },
    mainbackground: {
        // backgroundColor: "#5d93a4"
        backgroundColor: "#5d93a4"
    }
}));

export default useStyles;