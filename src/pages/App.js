import React from 'react';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core'
import { PhotoCamera } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import useStyles from '../style';

const App = () => {

    const classes = useStyles();

    const cards = [
        {number: 1,
            text: "A fun card!",
            image: "https://source.unsplash.com/random",},
        {number: 2,
            text: "A funner card!",
            image: "https://source.unsplash.com/random",},
        {number: 3,
            text: "A funnest card!",
            image: "https://source.unsplash.com/random",},
        {number: 4,
            text: "A funier card!",
            image: "https://source.unsplash.com/random",},
    ]

    return (
        <>
            {/* <CssBaseline /> */}
            <AppBar position="relative">
                <Toolbar>
                    <PhotoCamera className={classes.icon}/>
                    <Typography variant="h6">
                        Photo Album
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.container}>
                    <Container maxWidth="sm">
                        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                            Photo Album
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Hello everyone! This is a photo album and I am trying
                            to make this sentence as long as possible so we can see how it looks
                            on the screen!
                        </Typography>
                        <div className={classes.buttons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        See my photos
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="secondary">
                                        Secondary action
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container class={classes.gardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map(card => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia className={classes.cardMedia} image={card.image} title="Image Title"></CardMedia>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5">
                                            Heading
                                        </Typography>
                                        <Typography color="textSecondary">
                                            {card.text}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to={{pathname: "/card", state: {card: card, hasValue: true}}}><Button size="small" color="primary" className={classes.cardButtons}>View</Button></Link>
                                        <Button size="small" color="primary" className={classes.cardButtons}>Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>

        </>
    );
}

export default App;