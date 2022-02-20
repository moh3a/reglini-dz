import type { NextApiResponse } from "next";
import nc from "next-connect";
import dbConnect from "../../../../../config/db";

import User from "../../../../../models/User";
import CheckSession from "../../../../../utils/checkSession";
import {
  IExtendedAPIRequest,
  IFacebookPage,
  IFacebookPageAd,
} from "../../../../../types";

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const {
      pageId,
      pageAd,
    }: { pageId: IFacebookPage["page_id"]; pageAd: IFacebookPageAd } = req.body;

    const user = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });

    const index = user.facebookPages.findIndex(
      (page: IFacebookPage) => page.page_id.toString() === pageId
    );
    if (index === -1) {
      res
        .status(400)
        .json({ success: false, message: "Facebook page not found." });
    } else {
      user.facebookPages[index].page_ads.push(pageAd);
      await user.save();

      res.status(200).json({
        success: true,
        data: user,
        message: "Sent a request for a new ad.",
      });
    }
  });

export default handler;
