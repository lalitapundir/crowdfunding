module.exports = app => {
    const users = require("../Controllers/user.controller.js");
    //const authJwt  = require("../middleware/authJwt.js");
    let router = require("express").Router();
  
    // Register a new User
    router.post("/", users.validate('addUser'),users.register);


    //veriofy email of the user
    router.get("/verifyEmail/:id", users.verifyEmail);

     // Create a new User
    router.post("/login", users.login);


    app.use('/api/users', router);
  };