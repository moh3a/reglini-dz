require("dotenv").config();

import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { v2 as cloudinary } from "cloudinary";

import User from "../../../models/User";
import { getSession } from "next-auth/client";
import { IUser } from "../../../utils/types";

import multer from "multer";
const upload = multer({ dest: `${process.env.ROOT}/public/tmp/` });

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface ERT extends NextApiRequest {
  file?: any;
}

const handler = nc();
handler
  .use(upload.single("file"))
  .post(async (req: ERT, res: NextApiResponse) => {
    const session: IUser | null = await getSession({ req });
    try {
      if (!session) {
        res.status(403).json({ message: "Unauthorized to access this part." });
      } else if (session.user) {
        const email = session.user.email;
        const account = session.user.type;
        let provider: IUser["user.provider"];
        if (account === "oauth") {
          provider = session.user.provider;
        }
        const data = await User.findOne({
          account,
          email,
          provider: provider || undefined,
        });
        if (!data) {
          res.status(200).json({
            message: "No user was found.",
            success: false,
          });
        }
        let profilePicture: any;
        if (req.file) {
          await cloudinary.uploader.destroy(data._id);
          const image = await cloudinary.uploader.upload(req.file.path, {
            public_id: data._id,
            folder: "pp",
            width: 512,
            height: 512,
            crop: "fill",
          });
          profilePicture = image.secure_url;
        }
        data.picture = profilePicture;
        await data.save();
        res.status(200).json({
          success: true,
          message: "Profile picture successfully update.",
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

export default handler;
