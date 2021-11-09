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
  mainImage: {
      paddingTop: "15em",
      backgroundSize: "100%",
      backgroundPosition: "center",
      boxShadow: "inset 0 -50px 100px black",
  },
  avatar: {
      position: "relative",
      [theme.breakpoints.up('xs')]: {
        bottom: "-1.5em",
      },
    [theme.breakpoints.up('sm')]: {
        bottom: "-3em",
    },
  },
  mainSection: {
      backgroundColor: "#f7f7f7",
      paddingTop: "1em",
      paddingBottom: "6em",
  },
  linePaper: {
      padding: "2em",
  },
  
}));

export default useStyles;
