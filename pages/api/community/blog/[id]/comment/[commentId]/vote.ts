import nc from "next-connect";
import type { NextApiResponse } from "next";

import User from "../../../../../../../models/User";
import Blog from "../../../../../../../models/Blog";
import CheckSession from "../../../../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../../../../utils/types";

import dbConnect from "../../../../../../../config/db";

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
    const { id, commentId } = req.query;

    const user = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });

    const blog = await Blog.findById(id);
    const comment = blog.comments.find(
      (comment: any) => comment._id.toString() === commentId.toString()
    );
    const index = comment.voters.findIndex(
      (comment: any) => comment.userId.toString() === user._id.toString()
    );

    if (index === -1) {
      comment.votes++;
      comment.voters.push({ userId: user._id.toString() });
      await blog.save();
      res.status(200).json({
        success: true,
        data: blog,
        message: "Comment successfully upvoted.",
      });
    } else {
      comment.votes--;
      comment.voters.splice(index, 1);
      await blog.save();
      res.status(200).json({
        success: true,
        data: blog,
        message: "Successfully unlike the comment.",
      });
    }
  });

export default handler;
