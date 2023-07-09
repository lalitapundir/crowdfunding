const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const app = express();

const connectToMongo = require("./Config/dbConfig");
const Config = require("./Config");
// connect to mongodb 
connectToMongo();

let corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors())

//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Crwod application." });
});

//add routes 
var Routes = require("./app/Routes");
//app.use(Routes);

// load Model
//const db = require("./app/models");

// set port, listen for requests
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'



require("./app/Routes/UserRoutes")(app);
require("./app/Routes/CampaignRoutes")(app);

app.listen(PORT,HOST, () => {
  console.log(`Server is running on port ${HOST}:${PORT}.`);
});