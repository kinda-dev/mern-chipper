// requests, assign router object to router

const express = require("express");
const router = express.Router();

// imports required to create and get tweets
const mongoose = require('mongoose');
const passport = require('passport');

// require tweet model and validations
const Tweet = require('../../models/Tweet');
const validateTweetInput = require('../../validation/tweets');

//following we have the routes, this below is for testing
router.get("/test", (req, res) => {
    res.json({ msg: "This is the tweets route" })}
);

// post route
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTweetInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTweet = new Tweet({
      text: req.body.text,
      user: req.user.id
    });

    newTweet.save()
        .then(tweet => res.json(tweet));
  }
);

// get route, index route to get all the tweets back
router.get('/', (req, res) => {
    Tweet.find()
        .sort({ date: -1 })
        .then(tweets => res.json(tweets))
        .catch(err => res.status(404).json({ notweetsfound: 'No tweets found' }));
});

// get route, show route filtering the tweets by user
router.get('/user/:user_id', (req, res) => {
    // find is the filter
    Tweet.find({user: req.params.user_id})
        .then(tweets => res.json(tweets))
        .catch(err =>
            res.status(404).json({ notweetsfound: 'No tweets found from that user' }
        )
    );
});

// get route, show route filtered by tweet id
router.get('/:id', (req, res) => {
    Tweet.findById(req.params.id)
        .then(tweet => res.json(tweet))
        .catch(err =>
            res.status(404).json({ notweetfound: 'No tweet found with that ID' })
        );
});

module.exports = router;