import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Profile from '../components/profile/Profile';
import Person from '../components/cards/Person';
import Lonely from '../components/cards/Lonely'
import {connect} from 'react-redux';
import {getCards} from '../redux/actions/userActions';
import axios from "axios";

class home extends Component {
    componentDidMount() {
        axios.get('/cards')
            .then((res) => {
                const cards = res.data;
                this.setState({cards});
            });
        axios
            .get('/user')
            .then((res) => {
                const matches = res.data.credentials.matches;
                this.setState({matches});
            });

    }


    state = {
        cards: [],
        matches: [],
        currentPerson: 0
    };

    likeOrDislike = (userId, actionType) => {
        this.setState({
            currentPerson: this.state.currentPerson + 1
        });
        if (actionType === 'like') {
            console.log('like person');
            axios
                .get('/likeUser/' + userId)
                .then((res) => {
                    console.log(res.data);
                });
        } else {
            console.log('dislike');
            axios
                .get('/dislikeUser/' + userId)
                .then((res) => {
                    console.log(res.data)
                })
        }

        console.log("dislike/liked ", userId);
    };

    render() {
        const {user: {authenticated}} = this.props;

        const person = this.state.cards[this.state.currentPerson];
        let personJsx = authenticated ? (<Lonely/>) : null;
        if (person) personJsx = (<Person key={person.userId} person={person}
                                         like={() => this.likeOrDislike.bind(this, person.userId, 'like')}
                                         dislike={() => this.likeOrDislike.bind(this, person.userId, 'dislike')}
        />);

        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {personJsx}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
                <Grid item sm={4} xs={16}>
                    {authenticated ? this.state.matches.map(match => <li> {match}</li>) : null}
                </Grid>
            </Grid>
        );
    }
}

home.propTypes = {
    getCards: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
});

export default connect(
    mapStateToProps,
    {getCards}
)(home);