const nodemailer = require('nodemailer');

module.exports.mailfunction = async (from, to, subject, message) => {
  try {   
    const transporter = nodemailer.createTransport({
      service: 'gmail',//smtp.gmail.com  //in place of service use host...
      secure: true,//true
      port: 25,//465
      auth: {
        user:process.env.SENDER_EMAIL,
        pass:process.env.SENDER_PASSWORD

      }, tls: {
        rejectUnauthorized: false
      }
    });
    
    
    const mailOptions = {
        from: from, // sender address
        to:  to, // list of receiver 
        bcc:'pundirpearl12@gmail.com',
        subject: subject, // Subject line
        html: message
    };
   
    await transporter.sendMail(mailOptions);  
   
    transporter.close();
    return { status: 1, message: "mail sent" }
  } catch (error) {    
      return { status: 0, message: "mail not send" };
  }
}

