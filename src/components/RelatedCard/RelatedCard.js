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
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        Width: 400,
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

// const mapStateToProps = state => ({
//     tileInfo: state.tileInfo,
// });


class RelatedCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
        }
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={6} sm={3}>
                <Card className={classes.card}>
                    <CardHeader
                        title={this.props.cardInfo._source.title}
                        subheader={this.props.cardInfo._source.dated}
                    />
                    <CardMedia
                        className={classes.media}
                        image={`https://1.api.artsmia.org/${this.props.cardInfo._id}.jpg`} alt={this.props.cardInfo._source.title}
                        title={this.props.cardInfo._source.object_name}
                    />
                    <CardContent>
                        <Typography component="p">
                            {this.props.cardInfo._source.artist}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton
                        aria-label="Add to favorites"
                        className={classes.icon}
                        onClick={() => this.props.makeFavorite(this.props.cardInfo)}
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
                                Object: {this.props.cardInfo._source.object_name || 'Unknown'}
                            </Typography>
                            <Typography paragraph>
                                Country: {this.props.cardInfo._source.country || 'Unknown'}
                            </Typography>
                            <Typography paragraph>
                                Department: {this.props.cardInfo._source.department || 'Unknown'}
                            </Typography>
                            <Typography>
                                Description: {this.props.cardInfo._source.description || 'Not Available'}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        );
    }
}

RelatedCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(RelatedCard));