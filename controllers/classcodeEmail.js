var nodemailer = require("nodemailer");

module.exports = {
  sendEmail: (req, res) => {
    const {
      maillist,
      classroom_key,
      adminEmail,
      adminPass,
      class_title
    } = req.body;

    maillist.toString();
    {
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
        to: maillist,
        subject: "Confirmation Code",
        text: `Good Day! This is your classroom code for ${class_title} class: ${classroom_key}`
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  }
};
