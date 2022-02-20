import type { NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
const { CloudinaryStorage } = require("multer-storage-cloudinary");

import dbConnect from "../../../../../config/db";
import User from "../../../../../models/User";
import CheckSession from "../../../../../utils/checkSession";
import {
  IExtendedAPIRequest,
  IFacebookPage,
  IFacebookPageAd,
} from "../../../../../types";
import { LocalISODate } from "../../../../../utils/methods";

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
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .use(upload.single("file"))
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const {
      pageId,
      paymentMethod,
      adCreatedAt,
    }: {
      pageId: IFacebookPage["page_id"];
      adCreatedAt: IFacebookPageAd["created_at"];
      paymentMethod: "ccp" | "cib";
    } = req.body;

    const user = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${pageId} - ${adCreatedAt}`,
        folder: "payments",
      });
      let picture = image.secure_url;

      const index = user.facebookPages.findIndex(
        (page: IFacebookPage) => page.page_id.toString() === pageId
      );
      if (index === -1) {
        res
          .status(400)
          .json({ success: false, message: "Facebook page not found." });
      } else {
        const i = user.facebookPages[index].page_ads.findIndex(
          (ad: any) => ad.created_at === adCreatedAt
        );
        if (i === -1) {
          res.status(200).json({ success: false, message: "Ad not found" });
        } else {
          let date = LocalISODate();
          let payment = {
            wasDeclined: false,
            receipt: picture,
            paymentMethod,
            paymentTime: date,
          };
          user.facebookPages[index].page_ads[i].ad_status =
            "processing_payment";
          user.facebookPages[index].page_ads[i].payment = payment;
          await user.save();

          res.status(200).json({
            success: true,
            data: user,
            message: "Payment successfully submitted.",
          });
        }
      }
    }
  });

export default handler;
