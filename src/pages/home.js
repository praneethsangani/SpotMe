import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Profile from '../components/profile/Profile';
import Person from '../components/cards/Person';
import Lonely from '../components/cards/Lonely'
import { connect } from 'react-redux';
import { getCards, likeUser, dislikeUser } from '../redux/actions/userActions';
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
        cards: [],
        currentPerson: 0
    };

    hotOrNot = (userId, actionType) => {
        this.setState({
          currentPerson: this.state.currentPerson+1
        })
        if ( actionType === 'like') {
          console.log('like person')
          axios
          .get('/likeUser/' + userId)
          .then((res) => {
              console.log(res.data);
          });
        } else {
          console.log('dislike')
          axios
          .get('/dislikeUser/' + userId)
          .then((res) => {
      console.log(res.data)
    })
        }
       
        console.log("dislike/liked ", userId);
    }

    render() {
      const {user: {authenticated}} = this.props;

       const person = this.state.cards[this.state.currentPerson]
       let personJsx = authenticated ? (<Lonely
              // activeUserImage={people[activeUser].image}
              // likedUsers={likedUsers}
          />) : null;
       if (person) personJsx = (<Person key={person.userId} person={person} 
        like={() => this.hotOrNot.bind(this, person.userId, 'like')}
        dislike={() => this.hotOrNot.bind(this, person.userId, 'dislike')}
                                  // like={} 
                                    />);
        
       return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    { personJsx }
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
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
});

export default connect(
    mapStateToProps,
    { getCards }
)(home);