// requests, assign router object to router
const express = require("express");
const router = express.Router();

//import bcrypt for encoding
const bcrypt = require('bcryptjs');

// import user model
const User = require('../../models/User');

//following we have the routes
router.get("/test", (req, res) => {
    res.json({ msg: "This is the users route" })
});

router.post('/register', (req, res) => {
// user findone look up for the user to see if it exist already
// looking in the request body for the email
    User.findOne({email: req.body.email})
// condition to see if user already exist and what to do
// from the comeback promise
    .then(user => {
    if (user) {
    // Throw a 400 error if the email address already exists
      return res.status(400).json({email: "A user has already registered with this email"})
    } else {
    // Otherwise create a new user
        const newUser = new User({
            handle: req.body.handle,
            email: req.body.email,
            password: req.body.password
          })

    // the below is temporary, just for testing because the password has not been encrypted yet
    // saving the user and declaring what to do if save successful and what to do if not

    newUser.save()
        .then(user => res.send(user))
        .catch(err => res.send(err));
    }
    })
});
module.exports = router;