require("dotenv").config();
import type { NextApiResponse } from "next";
import nc from "next-connect";

import User from "../../../models/User";
import CheckSession from "../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../utils/types";

const handler = nc();
handler
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const data = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });
    res.status(200).json({ success: true, data, message: "User found." });
  });

export default handler;
