const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');

const cors = require('cors');
app.use(cors());

const {
    signUp,
    login,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser,
    getCards,
    likeUser,
    dislikeUser,
    getUserDetails
} = require('./handlers/users');

app.post('/signup', signUp);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:userId', FBAuth, getUserDetails);
app.get('/cards', FBAuth, getCards);
app.get('/likeUser/:userId', FBAuth, likeUser);
app.get('/dislikeUser/:userId', FBAuth, dislikeUser);

exports.api = functions.region('us-central1').https.onRequest(app);