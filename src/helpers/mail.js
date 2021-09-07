const nodemailer = require("nodemailer");
const { EMAIL_PASS } = require('../helpers/env')

const sendEmail = (receiver, result) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "nodemailertesting7@gmail.com",
        pass: EMAIL_PASS,
      },
    });
    const options = {
      from: "NodeMailer <nodemailertesting7@gmail.com>",
      to: receiver,
      subject: "Send Data Products",
      html: `<h1>${result[0].productName}</h1>`,
    };
    transporter.sendMail(options, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve("Email sent successfully");
      }
    });
  });
};

module.exports = sendEmail;
