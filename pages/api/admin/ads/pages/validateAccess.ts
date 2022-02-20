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
    const { id } = req.body;
    const user = await User.findOne({ "facebookPages.page_id": id }).select(
      "facebookPages"
    );
    if (user) {
      const index = user.facebookPages.findIndex(
        (page: any) => page.page_id.toString() === id
      );
      if (index !== -1) {
        user.facebookPages[index].access_status = "access_granted";
      }
      await user.save();
      res.status(200).json({
        success: true,
        message: "Successfully updated the status of the page.",
      });
    } else {
      res.status(400).json({ success: false, message: "No page was found." });
    }
  });

export default handler;
