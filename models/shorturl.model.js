const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
  },
  userID : {
    type: String,
    required: true,
  }
});

const UrlModel = mongoose.model("shorturl",urlSchema);

module.exports = {
    UrlModel
};

