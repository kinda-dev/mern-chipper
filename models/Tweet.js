const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  // user is similar to ActiveRecord association, in this case the type
  // retrieves the user Id and the ref is the model we want to associate
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  // this defines what the tweet should be
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Tweet = mongoose.model('tweet', TweetSchema);

module.exports = Tweet;