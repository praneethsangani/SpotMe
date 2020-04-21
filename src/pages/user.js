import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import {connect} from 'react-redux';

class user extends Component {
    state = {
        profile: null,
        screamIdParam: null
    };

    componentDidMount() {
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;

        if (screamId) this.setState({screamIdParam: screamId});

        this.props.getUserData(handle);
        axios
            .get(`/user/${handle}`)
            .then((res) => {
                this.setState({
                    profile: res.data.user
                });
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>

                </Grid>
                <Grid item sm={4} xs={12}>
                    <StaticProfile profile={this.state.profile}/>
                </Grid>
            </Grid>
        );
    }
}

user.propTypes = {
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps)(user);
