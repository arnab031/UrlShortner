require("dotenv").config();
const express = require("express");
const routes = require("./routes/baseRoute");

const app = express();

app.use(express.json());
app.use("/", routes);

app.listen(8080, () => {
  console.log("Listening on port 8080");
});