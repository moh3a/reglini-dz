require("dotenv").config();
import type { NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
const { CloudinaryStorage } = require("multer-storage-cloudinary");
import axios from "axios";

import User from "../../../../../models/User";
import CheckSession from "../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../types";

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
    const { orderId, rate, message } = req.body;
    const data = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });
    let picture: any;
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        public_id: orderId,
        folder: "received",
      });
      picture = image.secure_url;
    }

    if (rate || message) {
      let userInfo = {
        name: data.name,
        email: data.email,
        picture: data.picture,
      };
      await axios.post(`${process.env.NEXTAUTH_URL}/api/feedback`, {
        rate,
        message,
        userInfo,
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
      data.orders[index].packageReceived.wasReceived = true;
      data.orders[index].packageReceived.packagePicture = picture;
      await data.save();
      res.status(200).json({
        data,
        success: true,
        message: "Package received successfully.",
      });
    }
  });

export default handler;
