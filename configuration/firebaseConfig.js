// module.exports = {
//   account: {
//     firebaseAdminServiceAccount: process.env.FIREBASE_ADMIN,
//     projectID: process.env.FIREBASE_PROJECT_ID,
//   },
// }

// firestore.js
const admin = require("firebase-admin");
// const firebaseConfig = require("./firebaseConfig.json");
// Parse the secret string from env
const firebaseConfig = JSON.parse(process.env.firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  // credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

module.exports = db;
