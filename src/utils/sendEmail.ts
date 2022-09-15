import { IEmailOptions } from "../types";

// USING SMTP RELAY

const nodemailer = require("nodemailer");
const SendEmail = ({ from, to, subject, text }: IEmailOptions) => {
  const date = new Date().toISOString();

  const transporter = nodemailer.createTransport({
    service: process.env.SENDGRID_SMTP_SERVICE,
    auth: {
      user: process.env.SENDGRID_SMTP_USERNAME,
      pass: process.env.SENDGRID_SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from,
    to,
    subject,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif">
        <div
          style="
            display:flex;
            justify-content:center;
            text-align: center;
            margin: 0 5rem 0 5rem;
            padding-bottom: 1rem;
            border-bottom: 1px black solid;
          "
        >
            <img
              style="width: 50px; height: 50px; margin:auto;"
              src="https://res.cloudinary.com/dyypyf2sg/image/upload/v1640361409/reglinidz-icon-oval_ykndfi.png"
              alt="logo"
            />
        </div>
        <div
          style="
          padding: 20px 0 20px 10px;
          margin-right: 2rem;
          margin-left: 2rem;
          "
          >
          ${text}
          </div>
          <div
          style="
          border-top: 1px black solid;
            padding-top: 1rem;
            margin: 0 5rem 0 5rem;
            text-align: center;
          "
        >
          sent by the admin on ${date.substring(0, 10)} ${date.substring(
      11,
      16
    )} GMT
        </div>
      </div>
    `,
  };
  transporter.sendMail(mailOptions, function (err: any, info: any) {
    if (err) {
      console.log(err);
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
