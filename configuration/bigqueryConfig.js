const { BigQuery } = require("@google-cloud/bigquery");

// const bigquery = new BigQuery({
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   keyFilename: "./configuration/firebaseConfig.json",
// });
const bigquery = new BigQuery(); // Uses application default credentials

module.exports = bigquery;
