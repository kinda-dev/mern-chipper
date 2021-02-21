const { response } = require("express");
const express = require("express");
const app = express();

// below lines are for mongoDb connection
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// app is listening for a get request on the give route and send a response, not
// using the request attribute yet 

app.get("/", (req, res) => res.send("Ciao Amici"));

// set up a port for the app to listen to 

// what's before || is used for heroku it means if in production use that otherwise use

const port = process.env.PORT || 5000;

// we are gonna tell the app to listen to the port, second argument is callback that gets 
// invoked when the listening starts 

app.listen(port, () => console.log(`Server is running on port ${port}`));



// the console command " node app " will start the server