import nc from "next-connect";
import type { NextApiResponse } from "next";
import slugify from "slugify";

import User from "../../../models/User";
import Blog from "../../../models/Blog";
import CheckSession from "../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../utils/types";

import dbConnect from "../../../config/db";

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .get(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { slug } = req.body;
    console.log(slug);
  })
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { title, text } = req.body;
    let sluggable = title + Math.round(Math.random() * 10000).toString();
    const slug = slugify(sluggable);

    const user = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });

    const createdBlog = await Blog.create({
      title,
      slug,
      text,
      userId: user._id,
    });

    // Blog.watch().on("change", (data) => console.log(new Date(), data));

    user.blogs.unshift({ blogId: createdBlog._id });
    await user.save();
    res.status(200).json({
      success: true,
      data: createdBlog,
      message: "blog successfully created",
    });
  });

export default handler;
