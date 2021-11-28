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
    footer: {
        backgroundColor: "#3d3d3d",
        color:"white",
        width:"100%",
    },
    cardGrid: {
        padding: '20px 0',
        height: '100%',
        flexDirection: 'column',
    },
    contained: {
        paddingTop: "150px",
        paddingBottom: "150px",
    },
    page: {
        backgroundColor: "#3d3d3d",
        height: "100vh"
    },
    card: {
        width: "40vh",
        margin: "20px"
    },
    middletext: {
        align: "center"

    },
    mainPage: {
        backgroundColor: "#f7f7f7",
        paddingTop: "40px",
        paddingBottom: "40px",
    },


}));

export default useStyles;
