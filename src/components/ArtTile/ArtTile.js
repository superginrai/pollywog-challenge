import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
    // root: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'space-around',
    //     overflow: 'hidden',
    //     backgroundColor: theme.palette.background.paper,
    // },
    // gridList: {
    //     width: 500,
    //     height: 600,
    // },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

// const mapStateToProps = state => ({
//     randomArt: state.randomArt,
// });

function ArtTile(props) {
    const { classes } = props;
        return (
            <div className={classes.root}>
         
                        <GridListTile key={props.tile._source.title}>
                            <img src={`https://1.api.artsmia.org/${props.tile._id}.jpg`} alt={props.tile._source.title} />
                            <GridListTileBar
                                title={props.tile._source.title}
                                subtitle={<span>by: {props.tile._source.artist}</span>}
                                actionIcon={
                                    <IconButton className={classes.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
            </div>
        );
    }

ArtTile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArtTile);