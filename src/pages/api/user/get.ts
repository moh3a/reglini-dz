require("dotenv").config();
import dbConnect from "../../../../config/db";
import User from "../../../../models/User";
import Blog from "../../../../models/Blog";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    const { name } = req.body;
    const user = await User.findOne({ name }).select(
      "name email role picture blogs"
    );

    let blogIds: any[] = [];
    user.blogs.map((blog: any) => {
      blogIds.push(blog.blogId);
    });

    let blogs: any[] = [];
    if (user.blogs.length > 0) {
      const userblogs = await Blog.find({ _id: { $in: blogIds } });
      blogs = userblogs;
    }

    if (user) {
      res.status(200).json({
        success: true,
        data: { blogs, user },
        message: "User exists.",
      });
    } else {
      res.status(200).json({ success: false, message: "User does not exist." });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", status: 400 });
  }
}
