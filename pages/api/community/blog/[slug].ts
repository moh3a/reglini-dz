import nc from "next-connect";
import type { NextApiResponse } from "next";

import Blog from "../../../../models/Blog";
import User from "../../../../models/User";
import { IExtendedAPIRequest } from "../../../../utils/types";
import dbConnect from "../../../../config/db";

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .get(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { slug } = req.query;
    const blog = await Blog.findOne({ slug });

    if (blog) {
      const user = await User.findOne({ _id: blog.userId }).select(
        "name picture"
      );

      blog.userPicture = user.picture;
      blog.userName = user.name;

      res
        .status(200)
        .json({ success: true, message: "Blog post found.", data: blog });
    } else {
      res.status(200).json({ success: false, message: "Blog post not found." });
    }
  })
  .delete(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { slug } = req.query; // slug is actually id
    await Blog.deleteOne({ _id: slug });
    res
      .status(200)
      .json({ success: true, message: "Blog post successfully deleted." });
  });

export default handler;
