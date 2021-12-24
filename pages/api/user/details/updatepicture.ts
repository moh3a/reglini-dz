require("dotenv").config();
import type { NextApiResponse } from "next";
import nc from "next-connect";
import { v2 as cloudinary } from "cloudinary";

import User from "../../../../models/User";
import CheckSession from "../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../utils/types";

import multer from "multer";
const upload = multer({ dest: `tmp/` });
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc();
handler
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .use(upload.single("file"))
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const data = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });
    let profilePicture: any;
    if (req.file) {
      await cloudinary.uploader.destroy(data._id);
      const image = await cloudinary.uploader.upload(
        req.file.path /* req.file.buffer */,
        {
          public_id: data._id,
          folder: "pp",
          width: 512,
          height: 512,
          crop: "fill",
        }
      );
      profilePicture = image.secure_url;
    }
    data.picture = profilePicture;
    await data.save();
    res.status(200).json({
      success: true,
      message: "Profile picture successfully updated.",
    });
  });

export default handler;
