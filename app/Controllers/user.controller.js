const Models = require("../Models")
const moment = require('moment');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const Config  = require("../../Config");

const generator = require('generate-password');
const jwt = require('jsonwebtoken');
const EmailTemplates = require("../EmailTemplates");
const MailManager = require('../Lib/MailManager');
const Common = require('../Lib/Common');

const { body, validationResult , param,query} = require('express-validator/check');
const Users = mongoose.model('Users');



exports.validate = (method) => {

    let inVal = body('userId', "userId is required").not().isEmpty().isNumeric().withMessage('Only numeric value allowed')  
    
    switch (method) {
        case 'login': {
            return [
                body('email').not().isEmpty().withMessage("email is required").isEmail().withMessage("valid email is required"),
                body('password', "password is required").not().isEmpty(),
            ]
        }       
        case 'addUser': {
            return [
                body('email').trim().escape().not().isEmpty().withMessage("email is required").isEmail().withMessage("valid email is required"),
                body('name', "name is required").trim().escape().not().isEmpty(),
                body('password', "password is required").trim().escape().not().isEmpty(),
                body('countryCode', "countryCode is required").trim().escape().not().isEmpty().withMessage("countryCode is required"),
                body('phoneNo', "phone is required").trim().escape().not().isEmpty().withMessage("phone is required"),
               ]
        }
    }
};



// Create and Save a new User 
exports.register = async (req, res) => {

    let payload = req.body;
    // Validate Request
    const errors = validationResult(req).formatWith(Common.Failures);
    if (!errors.isEmpty()) {
   
        res.status(422).json({ errors: errors.array()});
        return;
    }
    // check if email already exist 
    let emailExist = await Users.findOne({email:payload.email},{email:1});
    if(emailExist){
      return res.status(400).send({
        status:400,
        message:Config.APP_CONSTANTS.MESSAGES.ERROR.EMAIL_EXIST
    });
    }

     // check if phone already exist 
     let phoneExist = await Users.findOne({phoneNo:payload.phoneNo},{phoneNo:1});
     if(phoneExist){
       return res.status(400).send({
         status:400,
         message:Config.APP_CONSTANTS.MESSAGES.ERROR.PHONE_EXIST
     });
     }
    let password = await bcrypt.hash(payload.password, 10);
    
    // Create a User
     let user = new Users({
      name :payload.name,
      email: payload.email,
      phoneNo: payload.phoneNo,
      countryCode:payload.countryCode,
      password: password
     })

     //send email to verify email address

     const url =  `http://localhost:3000/api/users/verifyUser/${user._id}`;

     let tempData={
      name:payload.name,
      link:url 
     }

     let subject = "Welcome to the Crowd Funding App"
     const message = await EmailTemplates.userTemplate.welcomeTemplate(tempData)
     await MailManager.mailfunction(process.env.MAIL_FROM, payload.email, subject, message)

    // Save User in the database
    user.save()
      .then(data => {
         return res.send({
          status:200,
          message:Config.APP_CONSTANTS.MESSAGES.SUCCESS.DEFAULT,
          data:data
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });


}


exports.verifyEmail = async (req, res)=>{

  const id = req.params.id
  console.log(id);
  // check if email already exist 
  let userExist = await Users.findOne({_id:id},{email:1});
  console.log(userExist);
  if(!userExist){
    return res.status(400).send({
      status:400,
      message:Config.APP_CONSTANTS.MESSAGES.ERROR.USER_NOT_EXIST
  });
  }
  let criteria = {
    _id: id,
  };

  let dataToUpdate = {
    $set: {
      emailVerified: true,
    },
  };
  let option = {
    lean: true,
    new: true,
  };

  await Users.updateOne(criteria,dataToUpdate,option);
  return res.send({
    status:200,
    message:Config.APP_CONSTANTS.MESSAGES.SUCCESS.DEFAULT
  });

}

exports.login = async (req,res)=>{
  let payload = req.body;
  const  user = await Users.findOne({ email:payload.email },{email:1,phoneNo:1,name:1,password:1},{lean:true})
  if(!user){
    return res.status(400).send({
      status:400,
      message:Config.APP_CONSTANTS.MESSAGES.ERROR.INVALID_CRED
    });
  } 
  const isEqual = await bcrypt.compare(payload.password, user.password)
  if (!isEqual) {
      return res.status(400).send({
        status:400,
        message:Config.APP_CONSTANTS.MESSAGES.ERROR.INVALID_CRED
      });
  }

  const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE__TIME });
  if (token) {

    delete user.password
    user.token = token
    return res.send({
      status:200,
      message:Config.APP_CONSTANTS.MESSAGES.SUCCESS.DEFAULT,
      data:user
    });
  }


}