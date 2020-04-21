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
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          <Cards/>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}


export default connect()(home);
