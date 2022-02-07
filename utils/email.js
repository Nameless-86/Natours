const nodemailer = require('nodemailer');

const sendEmail = async options => {
  //1)Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    logger: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    }
  });
  //2) Email options
  const mailOptions = {
    from: 'Nicola Petetta <Hello@Pet.com',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  //3) Send email
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;