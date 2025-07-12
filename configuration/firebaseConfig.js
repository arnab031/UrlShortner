// module.exports = {
//   account: {
//     firebaseAdminServiceAccount: process.env.FIREBASE_ADMIN,
//     projectID: process.env.FIREBASE_PROJECT_ID,
//   },
// }

// firestore.js
const admin = require("firebase-admin");
// const serviceAccount = require("./firebaseConfig.json");

admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

module.exports = db;
