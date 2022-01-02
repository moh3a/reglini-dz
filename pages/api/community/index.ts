import nc from "next-connect";
import type { NextApiResponse } from "next";

import Blog from "../../../models/Blog";
import User from "../../../models/User";
import { IExtendedAPIRequest } from "../../../utils/types";

import dbConnect from "../../../config/db";

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .get(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    let userIds: any[] = [];
    const blogs = await Blog.find().sort({ createdAt: -1 });

    blogs.map((blog: any) => {
      userIds.push(blog.userId);
    });
    console.log(userIds);

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

    console.log(blogs);

    res.status(200).json({
      success: true,
      data: blogs,
      message: "successfully retrieved all blogs",
    });
  });

export default handler;
