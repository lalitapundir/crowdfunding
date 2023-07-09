const mongoose = require("mongoose");
const Config = require('../../Config')
let Schema = mongoose.Schema;
var userSchema = new Schema({
  name: {
    type: String,
    required: 'This field is required'
  },
  email: {
    type: String,
    required: 'This field is required'
  },
  password: { type: String, default: "" },
  phoneNo: {
    type: Number,
    required: 'This field is required'
  },
  countryCode: {
    type: String,
    required: 'This field is required'
  },
  phoneVerified: { type: Boolean, default: false }, //is used to verify Phone
  emailVerified: { type: Boolean, default: false }, //is used to verify Email
  timeStamp: { type: Date, default: Date.now, required: true },

});

mongoose.model("Users", userSchema);