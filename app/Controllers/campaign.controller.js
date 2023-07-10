const Models = require("../Models")
const moment = require('moment');
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const Config  = require("../../Config");

const generator = require('generate-password');
const jwt = require('jsonwebtoken');
const EmailTemplates = require("../EmailTemplates");
const MailManager = require('../Lib/MailManager')
const Common = require('../Lib/Common')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { body, validationResult , param,query} = require('express-validator/check');
const { Model } = require("mongoose");
const Users = mongoose.model('Users');
const Campaign = mongoose.model('Campaign');
const Transaction = mongoose.model('Transaction');
const path = require("path");

exports.validate = (method) => {

    let inVal = body('userId', "userId is required").not().isEmpty().isNumeric().withMessage('Only numeric value allowed')  
    
    switch (method) {
         
        case 'addCampaigns': {
            return [
                body('name', "name is required").trim().escape().not().isEmpty(),
                body('description', "description is required").trim().escape().not().isEmpty(),
               // body('attachments', "conetnt is required").trim().escape().not().isEmpty().withMessage("content is required"),
                //body('type', "type is required").trim().escape().not().isEmpty().withMessage("attachment type is required"),

               ]
        }
        case 'charge': {
            return [
                body('amount', "amount is required").trim().escape().not().isEmpty(),
                body('cardToken', "cardToken is required").trim().escape().not().isEmpty(),
               ]
        }

       
    }
}; 

// Used to create campaigns
exports.create = async (req,res)=>{

    let payload = req.body;
    // Validate Request
    const errors = validationResult(req).formatWith(Common.Failures);
    if (!errors.isEmpty()) {
   
        res.status(422).json({ errors: errors.array()});
        return;
    }

    // check if user exist 
  let userExist = await Users.findOne({_id:req.userId},{email:1});
  if(!userExist){
    return res.status(400).send({
      status:400,
      message:Config.APP_CONSTANTS.MESSAGES.ERROR.USER_NOT_EXIST
  });
  }

    if(req.file){
    //check extension names;
    if (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png" || req.file.mimetype === "image/jpg" || req.file.mimetype === "image/svg") {
        payload.type = 'I';
    }else if(req.file.mimetype === "video/mp4"){
        payload.type = 'V';

    }
    payload.attachments = req.file.filename
}

    let campaign = new Campaign({
        name:payload.name,
        description:payload.description,
        attachments:payload.attachments,
        type:payload.type,
        userId:req.userId
    })
    // Save User in the database
    campaign.save()
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
          err.message || "Some error occurred while creating the Campagin."
      });
    });


            
}



exports.charge = async (req, res) => {
  const { amount, cardToken ,username} = req.body;

  try {
    const charge = await stripe.charges.create({
      amount:Math.round(amount*100), // Convert from dollars to cents, as integer
      currency: 'usd',
      source: cardToken,
      description: `Charge for the ${userExist.email} of ${amount}`,
    });

    let transaction = charge.id;

     // Donation data
     var donation = {
        username: username,
        amount: amount, 
        transactionId: transaction
    };

    // Record donation to database
    _recordDonation(donation);
    return res.send({
        status:200,
        message:Config.APP_CONSTANTS.MESSAGES.SUCCESS.DEFAULT,
        data:donation
      });
  } catch (err) {
    console.error('Error processing payment:', err);
    let message = 'An error occurred while processing your payment.';
    if (err.type === 'StripeCardError') {
      message = err.message;
    }
    res.status(500).send({
        message: message 
      });
   
  }
}

function _recordDonation(data){
    let campaign = new Transaction(data)
    // Save transactions in the database
    campaign.save();

}

// get single campaign
exports.findOne = async (req,res)=>{
  let campaignExist = await Campaign.findOne({_id:req.params.id});
  return res.send({
    status:200,
    message:Config.APP_CONSTANTS.MESSAGES.SUCCESS.DEFAULT,
    data:campaignExist
  });
}


// List all campaign of user
exports.list = async (req,res)=>{
  let campaigns = await Campaign.find({_id:req.params.id});
  return res.send({
    status:200,
    message:Config.APP_CONSTANTS.MESSAGES.SUCCESS.DEFAULT,
    data:campaigns
  });
}