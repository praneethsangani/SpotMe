import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Profile from '../components/profile/Profile';
import Cards from '../components/cards/Cards';

import { connect } from 'react-redux';


class home extends Component {

  componentDidMount() {
  }
  render() {
    const {
      user: {
          authenticated
      }
    } = this.props;
    return authenticated ? 
    (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          <Cards/>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

home.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(home);
