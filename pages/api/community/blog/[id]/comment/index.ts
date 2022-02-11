import nc from "next-connect";
import type { NextApiResponse } from "next";

import User from "../../../../../../models/User";
import Blog from "../../../../../../models/Blog";
import CheckSession from "../../../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../../../utils/types";

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
    const { text } = req.body;
    const { id } = req.query;

    const user = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });

    const comment = {
      userId: user._id,
      userName: user.name,
      userPicture: user.picture,
      text,
    };

    const blog = await Blog.findById(id);
    blog.comments.unshift(comment);
    blog.commentsCounter = blog.comments.length;

    await blog.save();
    res.status(200).json({
      success: true,
      data: blog,
      message: "comment successfully added",
    });
  });
// .delete(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
//   const { blogId, commentId } = req.body;

//   const user = await User.findOne({
//     email: req.userData.email,
//     account: req.userData.account,
//     provider: req.userData.provider,
//   });

//   const blog = await Blog.findById(blogId);
//   const comment = blog.comments.find(
//     (comment: any) => comment._id.toString() === commentId
//   );
//   console.log(comment);
// });

export default handler;
