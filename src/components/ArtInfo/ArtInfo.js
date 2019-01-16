import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import RelatedCard from '../RelatedCard/RelatedCard';

const styles = theme => ({
    card: {
        maxWidth: 450,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
    },
});

const mapStateToProps = state => ({
    tileInfo: state.tileInfo,
    relatedArt: state.relatedArt,
});


class ArtInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
        }
    }

    //Handler for the artwork card's expansion drop-down.
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    //Sends the clicked on card's JSON data to redux where it is stored in the favoriteArt array.
    //The user is then pushed to the FavoritesPage.
    makeFavorite = (tile) => {
        const action = { type: 'MAKE_FAVORITE', payload: tile }
        this.props.dispatch(action);
        this.props.history.push('/fav');
    }

    //Makes a call to MIA's api and retrieves the JSON data of 4 art pieces in same department as the one the user click on the LandingPage.
    //This data is sent to redux, stored in the relatedArt array, and then mapped to the DOM on Material UI cards.
    apiRelatedCall = () => {
        axios({
            url: `https://search.artsmia.org/random/art?size=4&q=department:${this.props.tileInfo._source.department}*`,
            method: 'GET',
        })
            .then(response => {
                let art = response.data;
                console.log(art);
                const action = {
                    type: 'RELATED_RESULTS',
                    payload: art
                };
                this.props.dispatch(action);
                console.log(this.props.randomArt[0]._source.title)
            })
            .catch(err => {
                console.error(err);
            });
    };

    componentDidMount() {
        this.apiRelatedCall();
        console.log(this.props.relatedArt)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={8} justify={'center'} >
                    <Grid item xs={12} >
                        <Card className={classes.card}>
                            <CardHeader
                                title={this.props.tileInfo._source.title}
                                subheader={this.props.tileInfo._source.dated}
                            />
                            <CardMedia
                                className={classes.media}
                                image={`https://1.api.artsmia.org/${this.props.tileInfo._id}.jpg`} alt={this.props.tileInfo._source.title}
                                title={this.props.tileInfo._source.object_name}
                            />
                            <CardContent>
                                <Typography component="p">
                                    {this.props.tileInfo._source.artist}
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <IconButton
                                    aria-label="Add to favorites"
                                    className={classes.icon}
                                    onClick={() => this.makeFavorite(this.props.tileInfo)}
                                >
                                    <StarBorderIcon />
                                </IconButton>
                                <IconButton
                                    className={classnames(classes.expand, {
                                        [classes.expandOpen]: this.state.expanded,
                                    })}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={this.state.expanded}
                                    aria-label="Show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>
                                        Object: {this.props.tileInfo._source.object_name || 'Unknown'}
                                    </Typography>
                                    <Typography paragraph>
                                        Country: {this.props.tileInfo._source.country || 'Unknown'}
                                    </Typography>
                                    <Typography paragraph>
                                        Department: {this.props.tileInfo._source.department || 'Unknown'}
                                    </Typography>
                                    <Typography>
                                        Description: {this.props.tileInfo._source.description || 'Not Available'}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><h2>More from {this.props.tileInfo._source.department}:</h2></Paper>
                    </Grid>
                    {this.props.relatedArt.map(cardInfo =>
                        <RelatedCard cardInfo={cardInfo} makeFavorite={this.makeFavorite} />)}
                </Grid>
            </div >
        );
    }
}

ArtInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ArtInfo));