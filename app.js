const express = require("express");
const app = express();

// importing routes
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

// requiring body-parser for responses
const bodyParser = require('body-parser');

// importing user model
const User = require('./models/User')

// below lines are for mongoDb connection
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

// .then it's the promise coming back, else catch whatever
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("***Connected to MongoDB successfully***"))
  .catch(err => console.log(err));

// using body-parser for responses from apps like postman to test (urlencoded)
app.use(bodyParser.urlencoded({
  extended: false
}));
// using body parser json to tell app to respond to json requests
app.use(bodyParser.json());

// app is listening for a get request on the give route and send a response, not
// using the request attribute yet 
app.get("/", (req, res) => {
  // create a new user model and save it
  const user = new User({
    handle: 'franco',
    email: 'franco@franco.com',
    password: 'fracothegreat'
  })
  user.save()
  res.send("Ciao Amici")
});


// tell express to use routes, if we get a request that matches the route
// we're going to use the function that we pass as second argument
app.use("/api/users", users);
app.use("/api/tweets", tweets);

// set up a port for the app to listen to 
// what's before || is used for heroku it means if in production use that otherwise use
const port = process.env.PORT || 5000;
// we are gonna tell the app to listen to the port, second argument is callback that gets 
// invoked when the listening starts 
app.listen(port, () => console.log(`***Server is running on port ${port}***`));

// the console command " node app " will start the server

// middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());