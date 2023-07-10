"use strict";

var DATABASE = {
	FILE_TYPE: {
		IMAGE: "I",
		VIDEO: "V",
        TEXT:"T"
	},
}

var MESSAGES ={
	SUCCESS:{
		DEFAULT: "Success"
	},
	ERROR:{
		EMAIL_EXIST:"Email already exist",
		USER_NOT_EXIST:"User does not Exist",
		PHONE_EXIST:"Phone number already exist with another user",
		INVALID_CRED:"Invalid email or password",
		NO_TOKEN:"No token provided!",
		UNAUTHORIZED:"Unauthorized or Token expire!",
		VERIFY_EMAIL:"Please verify email first!",
		VERIFY_PHONE:"Please verify Phone number first!"

	}
}

var APP_CONSTANTS = {
	DATABASE: DATABASE,
	MESSAGES:MESSAGES,
};

module.exports = APP_CONSTANTS;