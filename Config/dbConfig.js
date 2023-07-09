"use strict";

const mongoose = require("mongoose");
 let option = {
	useNewUrlParser:true,
    useUnifiedTopology:true,
    //useCreateIndex:true

  };
// connect to DB
const connectToMongo = async () => {
	try {
		mongoose.connect(process.env.MONGO_URI,{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			socketTimeoutMS: 800000000, 
		  }).then(()=>{
			console.log(`successfully connected`);
			}).catch((e)=>{
			console.log(`not connected`,e);
			});		
	}
	catch(error) {
		console.log("err",error)
		process.exit()
	}
	}

module.exports = connectToMongo;
