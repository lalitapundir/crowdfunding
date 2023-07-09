const jwt = require("jsonwebtoken");
const mongoose= require("mongoose");
const Config = require("../../Config");
const Users = mongoose.model('Users');


let verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: Config.APP_CONSTANTS.MESSAGES.ERROR.NO_TOKEN
      });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: Config.APP_CONSTANTS.MESSAGES.ERROR.UNAUTHORIZED
        });
      }
      req.userId = decoded.id;
      next();
    });
  };

  module.exports ={
    verifyToken:verifyToken
  }
  