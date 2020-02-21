var nodemailer = require("nodemailer");

module.exports = {
  sendEmail: (req, res) => {
    const {
      emailTo,
      classroom_key,
      adminEmail,
      adminPass,
      class_title
    } = req.body;

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
        to: emailTo,
        subject: `Classroom Code for ${class_title}`,
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
