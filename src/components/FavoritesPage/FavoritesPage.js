import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 600,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

const mapStateToProps = state => ({
    favoriteArt: state.favoriteArt,
});

class FavoritesPage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    //When the user clicks on a piece of art they are pushed to the ArtInfo page
    //where they can view more info about that piece and see related works.
    getInfo  = (tile) => {
        console.log(tile._source.title);
        const action = { type: 'GET_INFO', payload: tile }
        this.props.dispatch(action);
        this.props.history.push('/info');
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div"><h2>Your Favorites</h2></ListSubheader>
                    </GridListTile>
                    {this.props.favoriteArt.map(tile => (
                        <GridListTile key={tile._source.title} onClick={() => this.getInfo(tile)}>
                            <img src={`https://1.api.artsmia.org/${tile._id}.jpg`} alt={tile._source.title} />
                            <GridListTileBar
                                title={tile._source.title}
                                subtitle={<span>{tile._source.artist}</span>}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}
FavoritesPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(FavoritesPage));