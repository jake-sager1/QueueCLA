import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    icon: {
        marginRight: '20px',
    },
    buttons: {
        marginTop: '40px',
    },
    cardGrid: {
        padding: '20px 0',
        height: '100%',
        flexDirection: 'column',
    },
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
    }
}));

export default useStyles;