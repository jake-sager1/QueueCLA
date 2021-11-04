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
        position:"absolute",
        bottom:"0",
        width:"100%",
    },
    cardGrid: {
        padding: '20px 0',
        height: '100%',
        flexDirection: 'column',
    },
    middle: {
        position: 'absolute', left: '50%', top: '40%',
        transform: 'translate(-50%, -50%)',
    },
    stackmiddle: {
        margin: "auto",
        width: "100%",

    },

    contained: {
        paddingTop: "400px",
        paddingBottom: "400px",
    }



    
}));

export default useStyles;