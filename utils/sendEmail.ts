import { IEmailOptions } from "../types/emailType";

// USING SMTP RELAY

const nodemailer = require("nodemailer");

const SendEmail = (options: IEmailOptions) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SENDGRID_SMTP_SERVICE,
    auth: {
      user: process.env.SENDGRID_SMTP_USERNAME,
      pass: process.env.SENDGRID_SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDGRID_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err: any, info: any) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

export default SendEmail;

// USING SENDGRID API
// const SendGridMail = require('@sendgrid/mail')
// SendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
// export const sendMail = (options: IEmailOptions) => {
//   const message = {
//     to: options.to,
//     from: 'support@reglini-dz.com',
//     subject: options.subject,
//     text: options.text
//   }
//   SendGridMail.send(message).then(() => 'Email sent successfully.')
// }
