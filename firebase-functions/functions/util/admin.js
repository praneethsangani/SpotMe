const serviceAccount = require("../credentials/serviceAccountKey");  // To use firebase serve, comment to use deploy
const admin = require('firebase-admin');

// To use firebase serve, comment to use deploy
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://spotme-45836.firebaseio.com",
    storageBucket: "gs://spotme-45836.appspot.com/"
});

// admin.initializeApp();   // To use firebase deploy, uncomment to use deploy
const db = admin.firestore();

module.exports = {admin, db};
