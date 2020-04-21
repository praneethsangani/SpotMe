import {LOADING_CARDS, LOADING_USER, SET_AUTHENTICATED, SET_CARDS, SET_UNAUTHENTICATED, SET_USER} from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_CARDS:
            return {
                ...state,
                cards: action.payload,
                loading: false
            };
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_CARDS:
            return {
                ...state,
                loading: true
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
