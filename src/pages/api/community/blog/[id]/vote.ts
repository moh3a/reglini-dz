import nc from "next-connect";
import type { NextApiResponse } from "next";

import User from "../../../../../../models/User";
import Blog from "../../../../../../models/Blog";
import CheckSession from "../../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../../types";

import dbConnect from "../../../../../../config/db";

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
    const { id } = req.query;

    const user = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });

    const blog = await Blog.findById(id);
    const index = blog.voters.findIndex(
      (voter: any) => voter.userId.toString() === user._id.toString()
    );

    if (index === -1) {
      blog.votes++;
      blog.voters.push({ userId: user._id.toString() });
      await blog.save();
      res.status(200).json({
        success: true,
        data: blog,
        message: "Blog post successfully upvoted.",
      });
    } else {
      blog.votes--;
      blog.voters.splice(index, 1);
      await blog.save();
      res.status(200).json({
        success: true,
        data: blog,
        message: "Successfully unlike this blog post.",
      });
    }
  });

export default handler;
