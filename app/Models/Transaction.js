const mongoose = require("mongoose");
const Config = require('../../Config')
let Schema = mongoose.Schema;
var transactionSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  transactionId :  {
    type: String,
    required: true
  },
  timeStamp: { type: Date, default: Date.now, required: true },

});

mongoose.model("Transaction", transactionSchema);