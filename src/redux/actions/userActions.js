import {
    CLEAR_ERRORS,
    LOADING_CARDS,
    LOADING_UI,
    LOADING_USER,
    SET_CARDS,
    SET_ERRORS,
    SET_UNAUTHENTICATED,
    SET_USER
} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios
        .post('/login', userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios
        .post('/signup', newUserData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
};

export const getUserData = () => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios
        .get('/user')
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios
        .post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios
        .post('/user', userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
};

export const getCards = () => (dispatch) => {
    dispatch({type: LOADING_CARDS});
    axios
        .get('/cards')
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: SET_CARDS,
                payload: res.data
            });
            return res.data;
        })
        .catch(() => {
            dispatch({
                type: SET_CARDS,
                payload: []
            });
        });
};

export const likeUser = (userID) => (dispatch) => {
    dispatch({type: SET_USER});
    axios
        .get('/likeUser/' + userID)
        .then((res) => {
            console.log(res.data);
        });
};

export const dislikeUser = (userID) => (dispatch) => {
    dispatch({type: SET_USER});
    axios
        .get('/dislikeUser/' + userID)
        .then((res) => {
            console.log(res.data)
        })
};

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};
