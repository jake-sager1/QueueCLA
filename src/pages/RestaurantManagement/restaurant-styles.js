import { makeStyles } from '@mui/styles'
import { yellow } from '@mui/material/colors';

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
        color: "white",
    },
    page: {
        backgroundColor: "#3d3d3d",
        height: "100vh"
    },
    mainPage: {
        backgroundColor: "#f7f7f7",
        paddingTop: "40px",
        paddingBottom: "40px",
    },
    lineStatusHeader: {
        padding: "15px",
    },
    lineEntry: {
        backgroundColor: "red",
        padding: "10px",
    }
}));

export default useStyles;