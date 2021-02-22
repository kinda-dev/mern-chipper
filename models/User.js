// import mongoose schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create new user schema
const UserSchema = new Schema({
    // handle is kindof "username" in this case
    handle: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
//   }, {
//     timestamps: true
  })

  // exporting user into mongooose model function, first argument is what
  // we want the model to be called, the second is the schema we want to pass in
  module.exports = User = mongoose.model('users', UserSchema);