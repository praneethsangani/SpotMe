import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Profile from '../components/profile/Profile';

import { connect } from 'react-redux';
import { getCards } from '../redux/actions/userActions';
import axios from "axios";
import Cards from "../components/cards/Cards";

class home extends Component {
    componentDidMount() {
        axios.get('/cards')
            .then((res) => {
                const cards = res.data;
                this.setState({cards});
            });
    }

    state = {
        cards: []
    };

// {this.state.cards.map((scream) => <Scream key={scream.screamId} scream={scream} />)}

    render() {
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {this.state.cards.map(card => <li>{card.name}</li>)}
                    <Cards/>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        );
    }
}

home.propTypes = {
    getCards: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(
    mapStateToProps,
    { getCards }
)(home);