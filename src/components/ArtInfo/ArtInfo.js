import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles = theme => ({
    card: {
        maxWidth: 400,
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
    avatar: {
        backgroundColor: red[500],
    },
});

const mapStateToProps = state => ({
    tileInfo: state.tileInfo,
});


class ArtInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
        }
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    makeFavorite = (tile) => {
        const action = { type: 'MAKE_FAVORITE', payload: tile }
        this.props.dispatch(action);
        this.props.history.push('/fav');
    }

    render() {
        const { classes } = this.props;
        return (
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
                        {/* <Typography paragraph>More Info:</Typography> */}
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
        );
    }
}

ArtInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ArtInfo));