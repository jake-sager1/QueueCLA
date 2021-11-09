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
      bottom: "-60px",
  },
  mainSection: {
      backgroundColor: "white",
      paddingTop: "1em",
      paddingBottom: "6em",
  }
}));

export default useStyles;
