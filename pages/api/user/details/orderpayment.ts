require("dotenv").config();
import type { NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
const { CloudinaryStorage } = require("multer-storage-cloudinary");

import User from "../../../../models/User";
import SendEmail from "../../../../utils/sendEmail";
import { LocalISODate } from "../../../../utils/methods";
import CheckSession from "../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../utils/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tmp",
  },
});

const upload = multer({ storage: storage });

const handler = nc();
handler
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .use(upload.single("file"))
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { orderId, paymentMethod } = req.body;
    const data = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });
    let picture: any;
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        public_id: orderId,
        folder: "payments",
      });
      picture = image.secure_url;
      let text = `
          <h2>
          User with id ${data._id} and email address ${data.email} has made a payment.
          </h2>
          <p>The payment was made for order with the order id ${orderId}.</p>
          <p>The payment was via ${paymentMethod}.</p>
          <p>Here's the image sent to validate the payment.</p>
          <img alt='payment' src=${image.secure_url} />
          <p>A response should be sent to the user.</p>
          `;
      SendEmail({
        from: "support@reglini-dz.com",
        to: "moh3a@reglini-dz.com",
        subject: `Check the payment made by ${data.name}`,
        text,
      });
    }
    const index = data.orders.findIndex(
      (order: any) => order.orderId === orderId
    );
    if (index === -1) {
      res
        .status(200)
        .json({ success: false, message: "Could not find the order!" });
    } else {
      let date = LocalISODate();
      let payment = {
        wasDeclined: false,
        receipt: picture,
        paymentMethod,
        paymentTime: date,
      };
      data.orders[index].payment = payment;
      await data.save();
      res.status(200).json({
        data,
        success: true,
        message: "Payment successfully submitted.",
      });
    }
  });

export default handler;
