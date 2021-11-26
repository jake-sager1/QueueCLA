import { LocalDining, LocalDiningSharp, DinnerDiningSharp, BakeryDiningSharp, LunchDiningSharp, DiningSharp, TakeoutDiningSharp, LocalFloristSharp, FastfoodSharp } from '@mui/icons-material';
import { Chip, Box } from '@mui/material';
import React from 'react';




function MenuChip(props) {

    let vegetarian = (
        <Chip
        label={"Vegetarian"}
        icon={<DinnerDiningSharp fontSize="small"
        />}
        variant={props.variant}
        onClick={props.onClick}
        color="primary"
        />
    );
    
    let vegan = (
        <Chip
        label={"Vegan"}
        icon={<LocalFloristSharp fontSize="small"/>}
        variant={props.variant}
        onClick={props.onClick}
        color="primary"
        />
    );
    
    let glutenFree = (
        <Chip
        label={"Gluten-Free"}
        icon={<LocalDiningSharp fontSize="small"/>}
        variant={props.variant}
        onClick={props.onClick}
        color="primary"
        />
    );
    
    let fastFood = (
        <Chip
        label={"Fast Food"}
        icon={<FastfoodSharp fontSize="small"/>}
        variant={props.variant}
        onClick={props.onClick}
        color="primary"
        />
    );
    
    let breakfast = (
        <Chip
        label={"Breakfast"}
        icon={<BakeryDiningSharp fontSize="small"/>}
        variant={props.variant}
        onClick={props.onClick}
        color="primary"
        />
    );
    
    let lunch = (
        <Chip
        label={"Lunch"}
        icon={<LunchDiningSharp fontSize="small"/>}
        variant={props.variant}
        onClick={props.onClick}
        color="primary"
        />
    );
    
    let dinner = (
        <Chip
        label={"Dinner"}
        icon={<DiningSharp fontSize="small"/>}
        variant={props.variant}
        onClick={props.onClick}
        color="primary"
        />
    );
    
    let takeout = (
        <Chip
        label={"Takeout"}
        icon={<TakeoutDiningSharp fontSize="small"/>}
        variant={props.variant}
        onClick={props.onClick}
        color="primary"
        />
    );

    return (
        <Box>
            {props.name == "vegetarian" &&
                vegetarian
            }
            {props.name == "vegan" &&
                vegan
            }
            {props.name == "gluten-free" &&
                glutenFree
            }
            {props.name == "breakfast" &&
                breakfast
            }
            {props.name == "lunch" &&
                lunch
            }
            {props.name == "dinner" &&
                dinner
            }
            {props.name == "fast-food" &&
                fastFood
            }
            {props.name == "takeout" &&
                takeout
            }
        </Box>
    );
}

export default MenuChip;