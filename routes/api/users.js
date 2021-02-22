// requests, assign router object to router
const express = require("express");
const router = express.Router();

//import bcrypt for encoding
const bcrypt = require('bcryptjs');

// import user model
const User = require('../../models/User');

// import key for secret user auth token
const keys = require('../../config/keys');

// require jason web token and assign to variable jwt
const jwt = require('jsonwebtoken');

// require passport to create private routes
const passport = require('passport');

// imprting validations
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//following we have the routes
router.get("/test", (req, res) => {
    res.json({ msg: "This is the users route" })
});

// private route below *** thyis wasn't working
// router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
//     res.json({msg: 'Success'});
//   })

// private route that returns the user
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email
    });
  })


// register route and logic
router.post('/register', (req, res) => {
    // validations, object destructuring to get the fieldsn we are importing 
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

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
    // newUser.save()
    //     .then(user => res.json(user))
    //     .catch(err => console.log(err));

    // hahsing and salting, first argument is the number of rounds to salt, second argument is callback
    // invoked when salting is done, callback arguments 1 is errors, second is the salt we get back
    // the first argument in bcrypt.hash is the thing that we want to hash, second argument is salt we got back
    // third argument is err and hash if the hashing goes through
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            // this was to test after first set up
            // .then(user => res.json(user))

            //this is to assign a jason web token after user register
            .then(user => {
                const payload = { id: user.id, handle: user.handle };
  
                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                });
            })
            .catch(err => console.log(err));
        })
      })
    }
    })
});

// login route and login
router.post('/login', (req, res) => {
    // Vaildations
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({email})
      .then(user => {
        if (!user) {
          return res.status(404).json({email: 'This user does not exist'});
        }
  // this was for testing purposes
        // bcrypt.compare(password, user.password)
        //     .then(isMatch => {
        //     if (isMatch) {
        //       res.json({msg: 'Success'});
        //     } else {
        //       return res.status(400).json({password: 'Incorrect password'});
        //     }
        // })

    // this is to assign a jason web token
        bcrypt.compare(password, user.password)
            .then(isMatch => {
            if (isMatch) {
                // sending back the info that we want in the payload
                const payload = {id: user.id, handle: user.handle, email: user.email};
                // 1 arg is payload, 2 is secret key, 3 option hash for the key to expire
                // 4 callback once we created this jwt, returns error or token
                jwt.sign(
                payload,
                keys.secretOrKey,
              // Tell the key to expire in one hour
                {expiresIn: 3600},
                (err, token) => {
                    res.json({
                    success: true,
                    token: 'Bearer ' + token
                    });
                });
            } else {
                errors.password = "Incorrect password";
                return res.status(400).json(errors);
            }
        })
    })
})

module.exports = router;