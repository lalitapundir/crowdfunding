const mongoose = require("mongoose");
const Config = require('../../Config')
let Schema = mongoose.Schema;
var campaignSchema = new Schema({
  name: {
    type: String,
    required: 'This field is required'
  },
  description: {
    type: String
  },
  userId: { type: Schema.ObjectId, ref: "Users", trim: true, required: true },
  attachments: {
    type: String, default: ""
  },
  type:{
    type: String,
    enum: [
        Config.APP_CONSTANTS.DATABASE.FILE_TYPE.IMAGE,
        Config.APP_CONSTANTS.DATABASE.FILE_TYPE.VIDEO,
        Config.APP_CONSTANTS.DATABASE.FILE_TYPE.TEXT,
    ],
    default: Config.APP_CONSTANTS.DATABASE.FILE_TYPE.TEXT,
  },
  timeStamp: { type: Date, default: Date.now, required: true },

});

mongoose.model("Campaign", campaignSchema);