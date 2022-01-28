import mongoose from "mongoose";
import type { NextApiResponse } from "next";
import nc from "next-connect";
import dbConnect from "../../../../config/db";

import User from "../../../../models/User";
import CheckSession from "../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../utils/types";

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
    const { pageName, pageUrl, instagramPage } = req.body;

    const user = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });

    user.facebookPages.push({
      page_id: mongoose.Types.ObjectId(),
      page_name: pageName,
      page_url: pageUrl,
      instagram_page_linked: instagramPage,
      access_status: "processing_demand",
    });
    await user.save();
    console.log(user.facebookPages);

    res.status(200).json({
      success: true,
      data: user,
      message: "A demand for an access request to your Facebook page was sent.",
    });
  });

export default handler;
