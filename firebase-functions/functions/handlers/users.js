const {admin, db} = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

const {
    validateSignUpData,
    validateLoginData,
    reduceUserDetails,
} = require("../util/validators");

exports.signUp = (request, response) => {
    const newUser = {
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        name: request.body.name,
    };

    const {valid, errors} = validateSignUpData(newUser);
    if (!valid) return response.status(400).json(errors);

    const noImg = 'no-img.png';

    let token, userId;
    firebase.auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(idToken => {
            token = idToken;
            const userCredentials = {
                email: newUser.email,
                createdAt: new Date().toISOString(),
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
                name: newUser.name,
                userId
            };
            return db.doc(`/users/${userId}`).set(userCredentials);
        })
        .then(() => {
            return response.status(201).json({token});
        })
        .catch(error => {
            console.log(error);
            if (error.code === 'auth/email-already-in-use') {
                return response.status(400).json({email: 'Email is already in use.'})
            } else {
                return response.status(500).json({general: 'Something went wrong, please try again.'});
            }
        });
};

// Log user in
exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    const {valid, errors} = validateLoginData(user);

    if (!valid) return res.status(400).json(errors);

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({token});
        })
        .catch((err) => {
            console.error(err);
            // auth/wrong-password
            // auth/user-not-user
            return res
                .status(403)
                .json({general: "Wrong credentials, please try again"});
        });
};

// Add user details
exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body);

    db.doc(`/users/${req.user.uid}`)
        .update(userDetails)
        .then(() => {
            return res.json({message: "Details added successfully"});
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });
};
// // Get any user's details
// exports.getUserDetails = (req, res) => {
//   let userData = {};
//   db.doc(`/users/${req.params.handle}`)
//     .get()
//     .then((doc) => {
//       if (doc.exists) {
//         userData.user = doc.data();
//         return db
//           .collection("screams")
//           .where("userHandle", "==", req.params.handle)
//           .orderBy("createdAt", "desc")
//           .get();
//       } else {
//         return res.status(404).json({ errror: "User not found" });
//       }
//     })
//     .then((data) => {
//       userData.screams = [];
//       data.forEach((doc) => {
//         userData.screams.push({
//           body: doc.data().body,
//           createdAt: doc.data().createdAt,
//           userHandle: doc.data().userHandle,
//           userImage: doc.data().userImage,
//           likeCount: doc.data().likeCount,
//           commentCount: doc.data().commentCount,
//           screamId: doc.id,
//         });
//       });
//       return res.json(userData);
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).json({ error: err.code });
//     });
// };
// Get own user details
exports.getAuthenticatedUser = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.user.uid}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                userData.credentials = doc.data();
                return db
                    .collection('likes')
                    .where('userId', '==', req.user.uid)
                    .get();
            }
        })
        .then((data) => {
            userData.likes = [];
            data.forEach((doc) => {
                userData.likes.push(doc.data());
            });
            return res.json(userData);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });
};

exports.uploadImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({headers: req.headers});

    let imageToBeUploaded = {};
    let imageFileName;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log(fieldname, file, filename, encoding, mimetype);
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return res.status(400).json({error: 'Wrong file type submitted'});
        }
        // my.image.png => ['my', 'image', 'png']
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        // 32756238461724837.png
        imageFileName = `${Math.round(
            Math.random() * 1000000000000
        ).toString()}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = {filepath, mimetype};
        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on('finish', () => {
        admin
            .storage()
            .bucket()
            .upload(imageToBeUploaded.filepath, {
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: imageToBeUploaded.mimetype
                    }
                }
            })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
                return db.doc(`/users/${req.user.uid}`).update({imageUrl});
            })
            .then(() => {
                return res.json({message: 'image uploaded successfully'});
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({error: 'something went wrong'});
            });
    });
    busboy.end(req.rawBody);
};

// exports.markNotificationsRead = (req, res) => {
//   let batch = db.batch();
//   req.body.forEach((notificationId) => {
//     const notification = db.doc(`/notifications/${notificationId}`);
//     batch.update(notification, { read: true });
//   });
//   batch
//     .commit()
//     .then(() => {
//       return res.json({ message: "Notifications marked read" });
//     })
//     .catch((err) => {
//       console.error(err);
//       return res.status(500).json({ error: err.code });
//     });
// };
