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
import tileData from './tileData';

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
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

const mapStateToProps = state => ({
    randomArt: state.randomArt,
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
class LandingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    apiCall = () => {
        axios({
            url: "https://search.artsmia.org/random/art?size=10",
            method: 'GET',
        })
            .then(response => {
                let art = response.data;
                console.log(art);
                const action = {
                    type: 'ELASTIC_RESULTS',
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
        // const action = { type: 'API_CALL' }
        // this.props.dispatch(action);
        this.apiCall();
        console.log(this.props.randomArt)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Art</ListSubheader>
                    </GridListTile>
                    {this.props.randomArt.map(tile => (
                        <GridListTile key={tile._source.title}>
                            <img src={tile.img} alt={tile._source.title} />
                            <GridListTileBar
                                title={tile._source.title}
                                subtitle={<span>by: {tile._source.artist}</span>}
                                actionIcon={
                                    <IconButton className={classes.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}
LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(LandingPage));