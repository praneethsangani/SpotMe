import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Profile from '../components/profile/Profile';

import { connect } from 'react-redux';


class home extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
        {/*  Tinder Portion goes here*/}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};


export default connect()(home);
