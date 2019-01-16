import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

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
    randomArt: state.randomArt,
});

class LandingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    apiCall = () => {
        axios({
            url: 'https://search.artsmia.org/random/art?size=10&q=image:valid*',
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

    getInfo  = (tile) => {
        console.log(tile._source.title);
        const action = { type: 'GET_INFO', payload: tile }
        this.props.dispatch(action);
        this.props.history.push('/info');
    }

    componentDidMount() {
        this.apiCall();
        console.log(this.props.randomArt)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    {this.props.randomArt.map(tile => (
                        <GridListTile key={tile._source.title} onClick={() => this.getInfo(tile)}>
                            <img src={`https://1.api.artsmia.org/${tile._id}.jpg`} alt={tile._source.title} />
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