require("dotenv").config();
import nc from "next-connect";
import { v2 as cloudinary } from "cloudinary";
import { getSession } from "next-auth/client";

import User from "../../../models/User";
import SendEmail from "../../../utils/sendEmail";
import { LocalISODate } from "../../../utils/methods";
import { IUser } from "../../../utils/types";

import multer from "multer";
const upload = multer({ dest: "public/tmp" });

const handler = nc();
handler.post(upload.single("file"), async (req, res) => {
  const session: IUser | null = await getSession({ req });
  try {
    if (!session) {
      res.status(403).json({ message: "Unauthorized to access this part." });
    } else if (session.user) {
      const { orderId, paymentMethod } = req.body;
      const email = session.user.email;
      const account = session.user.type;
      let provider: IUser["user.provider"];
      if (account === "oauth") {
        provider = session.user.provider;
      }
      const data = await User.findOne({
        account,
        email,
        provider: provider || undefined,
      });
      if (!data) {
        res.status(200).json({
          message: "No user was found.",
          success: false,
        });
      }
      let picture: any;
      if (req.file) {
        const image = await cloudinary.uploader.upload(req.file.path, {
          public_id: orderId,
          folder: "payments",
        });
        picture = image.secure_url;
        let text = `
          <h3>
          User with id ${data._id} and email address ${data.email} has made a payment.
          </h3>
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
          success: true,
          message: "Payment successfully submitted.",
        });
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
