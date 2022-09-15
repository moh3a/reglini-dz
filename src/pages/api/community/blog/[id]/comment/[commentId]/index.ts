import nc from "next-connect";
import type { NextApiResponse } from "next";

import User from "../../../../../../../../models/User";
import Blog from "../../../../../../../../models/Blog";
import CheckSession from "../../../../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../../../../types";

import dbConnect from "../../../../../../../../config/db";

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
    const { id, commentId } = req.query;

    const user = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });

    const blog = await Blog.findById(id);
    const comment = blog.comments.find(
      (comment: any) => comment._id.toString() === commentId
    );
    if (comment.userId.toString() === user._id.toString()) {
      const index = blog.comments.findIndex(
        (comment: any) => comment._id.toString() === commentId
      );
      blog.comments.splice(index, 1);
      blog.commentsCounter -= 1;
      await blog.save();
      res.status(200).json({
        success: true,
        message: "Successfully deleted comment.",
        data: blog,
      });
    } else {
      res
        .status(200)
        .json({ success: false, message: "Could not delete this comment." });
    }
  });

export default handler;
