import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import TourStops from './TourStops';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

const mapStateToProps = state => ({
    audioArt: state.audioArt,
});


class AudioTour extends Component {
    constructor(props) {
        super(props)

        this.state = {
            randomAudio: '001',
        }
    }

    handleAudioClick = () => {
        let randomNumber = Math.floor(Math.random() * (970 - 1 + 1)) + 1;
        if (randomNumber < 100) {
            randomNumber = ('0' + randomNumber)
        }
        if (randomNumber < 10) {
            randomNumber = ('0' + randomNumber)
        }
        this.setState(state => ({
            randomAudio: randomNumber
        }))
        console.log(randomNumber);
    };

    render() {
        const { classes, theme } = this.props;
        return (
            <div>
                <Grid container alignItems={'center'} justify={'center'} direction={'column'} >
                    <Grid item >
                        {TourStops.map(stop => (
                            <Card className={classes.card}>
                                <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography component="h5" variant="h5">
                                            {stop.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {stop.artist}
                                        </Typography>
                                    </CardContent>
                                    <div className={classes.controls}>
                                        <audio
                                            controls
                                            src={stop.audio}>
                                            Your browser does not support the
                                    <code>audio</code> element.
                                </audio>
                                        {/* <IconButton aria-label="Previous">
                                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                </IconButton>
                                <IconButton aria-label="Play/pause">
                                    <PlayArrowIcon className={classes.playIcon} />
                                </IconButton>
                                <IconButton aria-label="Next">
                                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                </IconButton> */}
                                    </div>
                                </div>
                                <CardMedia
                                    className={classes.cover}
                                    image={stop.image}
                                    title={stop.title}
                                />
                            </Card>
                        ))}
                    </Grid>
                    <Grid item>
                        <audio
                            controls
                            src={`http://audio-tours.s3.amazonaws.com/p${this.state.randomAudio}.mp3`}>
                            Your browser does not support the
                                    <code>audio</code> element.
                                </audio>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleAudioClick}>Random Audio Tour</Button>
                    </Grid>
                </Grid>
            </div>

        );
    }
}

AudioTour.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(AudioTour));