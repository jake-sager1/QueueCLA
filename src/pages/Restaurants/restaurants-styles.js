import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  cardMedia: {
      paddingTop: '56.25%',
  },
  cardContent: {
      flexGrow: 1
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
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
  contained: {
      paddingTop: "50px",
      paddingBottom: "50px",
  },
  middletext: {
      align: "center"
  },
  card: {
    height: "100%",
    display: "flex", 
    flexDirection: "column",
  },
  cardActionArea: {
      height: "100%",
  },
  chips: {
    padding: "9px"
  }
}));

export default useStyles;
