const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');

const cors = require('cors');
app.use(cors());

// const {db} = require('./util/admin');

// const {
//     getAllScreams,
//     postOneScream,
//     getScream,
//     commentOnScream,
//     likeScream,
//     unlikeScream,
//     deleteScream
// } = require('./handlers/screams');
const {
    signUp,
    login,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser,
    // getUserDetails,
    // markNotificationsRead
} = require('./handlers/users');

// Scream routes
// app.get('/screams', getAllScreams);
// app.post('/scream', FBAuth, postOneScream);
// app.get('/scream/:screamId', getScream);
// app.delete('/scream/:screamId', FBAuth, deleteScream);
// app.get('/scream/:screamId/like', FBAuth, likeScream);
// app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);
// app.post('/scream/:screamId/comment', FBAuth, commentOnScream);

// users routes
app.post('/signup', signUp);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
// app.get('/user/:handle', getUserDetails);
// app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.region('us-central1').https.onRequest(app);