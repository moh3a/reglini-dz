import nc from "next-connect";
import type { NextApiResponse } from "next";

import Blog from "../../../../models/Blog";
import User from "../../../../models/User";
import { IExtendedAPIRequest } from "../../../types";
import dbConnect from "../../../../config/db";

const handler = nc();
handler
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) => {
    await dbConnect();
    next();
  })
  .get(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    let userIds: any[] = [];
    const blogs = await Blog.find()
      .select("-text -comments -voters")
      .sort({ createdAt: -1 });

    blogs.map((blog: any) => {
      userIds.push(blog.userId);
    });

    const data = await User.find({ _id: { $in: userIds } }).select(
      "name picture"
    );

    blogs.map((blog: any) => {
      const index = data.findIndex(
        (e: any) => e._id.toString() === blog.userId.toString()
      );
      if (index !== -1) {
        blog.userPicture = data[index].picture;
        blog.userName = data[index].name;
      }
    });

    res.status(200).json({
      success: true,
      data: blogs,
      message: "successfully retrieved all blogs",
    });
  })
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    // to get static paths for /community/blog/[slug]
    const blogs = await Blog.find().select("slug");
    res.status(200).json({
      blogs,
    });
  });

export default handler;
