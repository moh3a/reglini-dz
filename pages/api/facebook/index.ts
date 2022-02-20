require("dotenv").config();
import type { NextApiResponse } from "next";
import nc from "next-connect";
import { getSession } from "next-auth/client";
import dbConnect from "../../../config/db";
import { IExtendedAPIRequest, IUser } from "../../../types";
import axios from "axios";

const adsSdk = require("facebook-nodejs-business-sdk");
import { Campaign, AdAccount, FacebookAdsApi } from "facebook-business-sdk-ts";

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
      const api = FacebookAdsApi.init(accessToken);
      const account = new AdAccount("act_558237911878111");

      //   const { data } = await axios.get(
      //     `https://graph.facebook.com/v12.0/me?fields=id%2Cname%2Cemail&access_token=${accessToken}`
      //   );

      let campaign_id: any;
      try {
        const campaign = await account.createCampaign([], {
          [Campaign.Fields.name]: "Page likes campaign",
          [Campaign.Fields.status]: Campaign.Status.paused,
          [Campaign.Fields.objective]: Campaign.Objective.page_likes,
          [Campaign.Fields.special_ad_categories]:
            Campaign.SpecialAdCategories.none,
        });
        console.log(campaign);
        if (campaign) campaign_id = campaign.id;
      } catch (error: any) {
        console.log(error);
      }
    } else {
      res.status(200).json({
        success: false,
        message: "You should be logged in via the Facebook provider.",
      });
    }
  });

export default handler;
