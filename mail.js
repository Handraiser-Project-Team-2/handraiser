var nodemailer = require("nodemailer");

module.exports = {
  sendEmail: (req, res) => {
    const { emailTo, key, adminEmail, adminPass } = req.body;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: adminEmail,
        pass: adminPass
      }
    });

    var mailOptions = {
      from: adminEmail,
      to: emailTo,
      subject: "Confirmation Code",
      text: `Good Day! This is your confirmation code: ${key}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
};
