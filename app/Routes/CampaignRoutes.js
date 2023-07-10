module.exports = app => {
    const campaigns = require("../Controllers/campaign.controller");
    const authJwt  = require("../Lib/authJwt");
    let router = require("express").Router();
    const multer = require("multer");

    //Setting storage engine
    const storageEngine = multer.diskStorage({
      destination: "./uploads",
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
      },
    });

    const path = require("path");

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg|mp4/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

    const upload = multer({
      storage: storageEngine,
      limits: { fileSize: 10000000 },
      fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
      },
    });
  
    // Used to Create a new campaign
    router.post("/", upload.single("attachments"),[authJwt.verifyToken],campaigns.validate('addCampaigns'),campaigns.create);
  
      // Used to list all campaign
      router.get("/",campaigns.list);
  

    // useed to accept donation for the campaigns without saving cards
    router.post("/charge",[authJwt.verifyToken],campaigns.validate('charge'),campaigns.charge)

    router.get('/:id', campaigns.findOne)
    
    app.use('/api/campaigns',[authJwt.verifyToken], router);
  };