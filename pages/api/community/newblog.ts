// find many with ids
// const records = await Model.find({ '_id': { $in: ids } });

import nc from "next-connect";
import type { NextApiResponse } from "next";
import slugify from "slugify";

import User from "../../../models/User";
import Blog from "../../../models/Blog";
import CheckSession from "../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../utils/types";

const handler = nc();
handler
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { title, text } = req.body;
    const slug = slugify(title);

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

    Blog.watch().on("change", (data) => console.log(new Date(), data));

    user.blogs.push({ blogId: createdBlog._id });
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "blog successfully created" });
  });

export default handler;