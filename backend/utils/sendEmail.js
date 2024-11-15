const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendEmail = async (sub, msg, recipientEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: recipientEmail,
    subject: sub,
    html: `
        <html>
          <body>
            ${msg}
          </body>
        </html>
        `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};
