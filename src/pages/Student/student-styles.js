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
  contained: {
      paddingTop: "75px",
      paddingBottom: "75px",
  },
  middletext: {
      align: "center"
  },
  searchBar: {
      marginLeft: "20px",
      width: "250px",
  },
  card: {
      minHeight: "280px",
  },
  cardActionArea: {
      minHeight: "280px",
  }
}));

export default useStyles;
