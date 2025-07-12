const { BigQuery } = require("@google-cloud/bigquery");

// const bigquery = new BigQuery({
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   keyFilename: "./configuration/firebaseConfig.json",
// });
// const bigquery = new BigQuery(); // Uses application default credentials
// Parse the JSON from the environment variable
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
firebaseConfig.private_key = firebaseConfig.private_key.replace(/\\n/g, "\n");

const bigquery = new BigQuery({
  projectId: firebaseConfig.project_id,
  credentials: {
    client_email: firebaseConfig.client_email,
    private_key: firebaseConfig.private_key,
  },
});

module.exports = bigquery;
