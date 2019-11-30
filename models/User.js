const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  Email: {
    type: String,
    required: true
  },
  Hashed_password: {
    type: String,
    required: true
  },

  Categories: [
    {
      type: String
    }
  ],

  Vocabulary: [
    {
      Word: {
        type: String,
        required: true
      },
      Translation: {
        type: String,
        required: true
      },
      From: {
        type: String,
        required: true
      },
      To: {
        type: String,
        required: true
      },
      Category: {
        type: String,
        required: true
      }
    }
  ]
});
module.exports = User = mongoose.model("users", UserSchema);
