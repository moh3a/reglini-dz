import type { NextApiResponse } from "next";
import nc from "next-connect";
import dbConnect from "../../../../../config/db";

import User from "../../../../../models/User";
import CheckSession from "../../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../../types";

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) => {
    const data = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });
    if (data.role !== "admin") {
      res.status(200).json({
        success: false,
        message: "Unauthorized to access this part.",
      });
    } else {
      next();
    }
  })
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { pageId, adCreatedAt, isAccepted } = req.body;

    const user = await User.findOne({ "facebookPages.page_id": pageId }).select(
      "facebookPages"
    );
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "No facebook pages exist." });
    } else {
      const index = user.facebookPages.findIndex(
        (page: any) => page.page_id.toString() === pageId
      );
      const i = user.facebookPages[index].page_ads.findIndex(
        (ad: any) => ad.created_at === adCreatedAt
      );
      if (i === -1) {
        res.status(200).json({ success: false, message: "Ad not found" });
      } else {
        if (isAccepted) {
          user.facebookPages[index].page_ads[i].ad_status = "ad_success";
        } else {
          user.facebookPages[index].page_ads[i].ad_status = "ad_fail";
          user.facebookPages[index].page_ads[i].payment = {
            wasDeclined: true,
            receipt: undefined,
            paymentMethod: undefined,
            paymentTime: undefined,
          };
        }
        await user.save();
        res.status(200).json({
          success: true,
          data: user,
          message: "Updated user ad status.",
        });
      }
    }
  });

export default handler;
