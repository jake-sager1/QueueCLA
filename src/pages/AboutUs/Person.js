import React from 'react'
import useStyles from './about-styles'

function Person (props) {
    const classes = useStyles()
    return(
        <div className={classes.personcontainer}>
            <div className={classes.imagecontainer}>
                <img className={classes.displaypic} src="https://source.unsplash.com/random" />
            </div>
            <div className={classes.namecontainer}>
                {props.name}
            </div>
        </div>
    )
}

export default Person