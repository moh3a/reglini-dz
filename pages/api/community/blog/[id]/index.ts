import nc from "next-connect";
import type { NextApiResponse } from "next";

import Blog from "../../../../../models/Blog";
import CheckSession from "../../../../../utils/checkSession";
import User from "../../../../../models/User";
import { IExtendedAPIRequest } from "../../../../../utils/types";
import dbConnect from "../../../../../config/db";

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .delete(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { id } = req.query;

    const user = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });

    const blog = await Blog.deleteOne({ _id: id, userId: user._id });
    if (blog.ok) {
      res
        .status(200)
        .json({
          success: true,
          id,
          message: "Blog post successfully deleted.",
        });
    } else {
      res
        .status(200)
        .json({ success: false, message: "Blog post could not be deleted." });
    }
  });

export default handler;
