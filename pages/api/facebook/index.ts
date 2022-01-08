require("dotenv").config();
import type { NextApiResponse } from "next";
import nc from "next-connect";
import { getSession } from "next-auth/client";
import dbConnect from "../../../config/db";
import { IExtendedAPIRequest, IUser } from "../../../utils/types";
const adsSdk = require("facebook-nodejs-business-sdk");

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const session: IUser | null = await getSession({ req });
    if (!session) {
      res.status(403).json({ message: "Unauthorized to access this part." });
    } else if (
      session.user &&
      session.user.type === "oauth" &&
      session.user.provider === "facebook"
    ) {
      const accessToken = session.user.accessToken;
      const api = adsSdk.FacebookAdsApi.init(accessToken);
      const AdAccount = adsSdk.AdAccount;
      const Campaign = adsSdk.Campaign;
      const account = new AdAccount("act_558237911878111");

      console.log("facebook access token = " + accessToken);
      console.log("ad account result = ");
      console.log(account);
    } else {
      res.status(200).json({
        success: false,
        message: "You should be logged in via the Facebook provider.",
      });
    }
  });

export default handler;
