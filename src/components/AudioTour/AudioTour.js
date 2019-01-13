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

        // this.state = {
        //     expanded: false,
        // }
    }

    // handleExpandClick = () => {
    //     this.setState(state => ({ expanded: !state.expanded }));
    // };

    // makeFavorite = (tile) => {
    //     const action = { type: 'MAKE_FAVORITE', payload: tile }
    //     this.props.dispatch(action);
    //     this.props.history.push('/fav');
    // }

    apiAudioCall = () => {
        axios({
            url: 'https://search.artsmia.org/id/1218',
            method: 'GET',
        })
            .then(response => {
                let art = response.data;
                console.log(art);
                const action = {
                    type: 'AUDIO_RESULTS',
                    payload: art
                };
                this.props.dispatch(action);
            })
            .catch(err => {
                console.error(err);
            });
    };

    componentDidMount() {
        this.apiAudioCall();
        console.log(this.props.audioArt)
    }

    render() {
        const { classes, theme } = this.props;
        return (
            <div>
            <Card className={classes.card}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="Previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="Play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="Next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </div>
            </div>
            <CardMedia
              className={classes.cover}
              image="/static/images/cards/live-from-space.jpg"
              title="Live from space album cover"
            />
          </Card>
          {/* {this.props.audioArt.map((audioCard) => 
          <p> { audioCard }</p>
          )} */}
    {/* {this.props.audioArt.related_audio_stops[0].link} */}
          </div>
        );
    }
}

AudioTour.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(AudioTour));