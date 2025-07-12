require("dotenv").config();
const express = require("express");
const routes = require("./routes/baseRoute");

const app = express();

app.use(express.json());
app.use("/", routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Listening on port 8080");
});