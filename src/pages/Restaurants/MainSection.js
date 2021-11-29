import React from 'react'
import useStyles from './restaurants-styles'
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, CardActionArea } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import BasicCard from '../BasicCard';
import image1 from '../../images/dining.jpeg'
import image2 from '../../images/background.jpeg'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import DiningIcon from '@mui/icons-material/Dining';
import LocalDiningSharpIcon from '@mui/icons-material/LocalDiningSharp';
import DinnerDiningSharpIcon from '@mui/icons-material/DinnerDiningSharp';
import MenuChip from '../../GlobalComponents/Chips';

class RestaurantTags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedChips: [],
        }
    }

    chips = [
        "vegetarian", "vegan", "gluten-free", "breakfast", "lunch", "dinner",
        "fast-food", "takeout"
    ]

    handleClick(chip) {
        if(this.state.selectedChips.includes(chip)) {
            this.setState({
                selectedChips: this.state.selectedChips.filter(function (value, index, arr) {return arr.includes(value) && value != chip}),
            });
        } else {
            this.setState({
                selectedChips: this.state.selectedChips.concat([chip]),
            });
        }
    }

    render() {
        return (
            <Stack direction="row" alignItems="center" style={{marginLeft: "10px"}}>
                <Stack spacing={1} alignItems="center" direction="row" justifyContent="flex-start"
                    style={{overflow: "scroll"}, {padding: "10px"}}>
                    {this.chips.map((name) =>
                            <MenuChip name={name}
                            onClick={() => this.handleClick(name)}
                            variant={this.state.selectedChips.includes(name) ? "filled" : "outlined"}/>
                    )}
                </Stack>
            </Stack>
        );
    }
}


function MainSection(props) {

  const classes = useStyles();

  return (

      <div className={classes.contained} style={{backgroundColor: "#f7f7f7"}}>
          <Container maxWidth="md">
          <RestaurantTags alignItems="center"/>
            <Grid container spacing={2} alignItems="stretch">
                {Object.keys(props.restaurants).map((id) => (
                    
                    <Grid item key={id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardActionArea component={Link} to={"/restaurants/" + id} className={classes.cardActionArea}>
                                <CardMedia className={classes.cardMedia} image={props.restaurants[id].bannerImage} title="Image Title"></CardMedia>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5">
                                        {props.restaurants[id].name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {props.restaurants[id].description}
                                    </Typography>
                                </CardContent>

                                <Stack className={classes.chips} direction="row" spacing={1}>
                                    {props.restaurants[id].chips.map((name) => 
                                        <MenuChip name={name} 
                                        onClick={null}
                                        variant="outlined"/>
                                    )}
                                </Stack>

                            </CardActionArea>

                        </Card>
                    </Grid>
                ))}
            </Grid>

          </Container>
      </div>

  );
}


export default MainSection;
