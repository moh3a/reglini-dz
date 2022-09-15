import nc from "next-connect";
import type { NextApiResponse } from "next";
import slugify from "slugify";
import { v2 as cloudinary } from "cloudinary";

import User from "../../../../../models/User";
import Blog from "../../../../../models/Blog";
import CheckSession from "../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../types";
import dbConnect from "../../../../../config/db";

const handler = nc();
handler
  .use(async (req: IExtendedAPIRequest, res, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { title, text, raw_text, category, images } = req.body;
    if (title && text) {
      let sluggable = title + Math.round(Math.random() * 10000).toString();
      const slug = slugify(sluggable);

      const user = await User.findOne({
        email: req.userData.email,
        account: req.userData.account,
        provider: req.userData.provider,
      });

      if (text.includes("<img")) {
        let a: string[] = text.split("<img");
        if (a.length > 0) {
          let t = a.map(async (e, i) => {
            let replaced = "";
            if (e.includes(`src="data`)) {
              const first = e.split(`src="data`)[1];
              const second = "data" + first.split(`"`)[0];
              const image = await cloudinary.uploader.upload(second, {
                folder: "blogs",
                public_id: slug + "_" + i,
              });
              replaced = e.replace(second, image.secure_url);
              return "<img" + replaced;
            } else {
              return e;
            }
          });
          Promise.allSettled(t).then((result) => {
            let final = "";
            result.map((r: any) => {
              final += r.value;
            });
            Blog.create(
              {
                title,
                slug,
                category,
                text: final,
                raw_text,
                userId: user._id,
              },
              function (error, blog) {
                user.blogs.unshift({ blogId: blog._id });
                user.save(function (err: any) {
                  if (err) {
                    res.status(200).json({
                      success: true,
                      data: blog,
                      message: "blog successfully created",
                    });
                  }
                });
              }
            );
          });
        }
      } else {
        const createdBlog = await Blog.create({
          title,
          slug,
          category,
          text,
          raw_text,
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
      }
    } else {
      res.status(200).json({
        success: false,
        message: "A title and a text must be provided.",
      });
    }
  });

export default handler;
