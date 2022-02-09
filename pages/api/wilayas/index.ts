require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import dbConnect from "../../../config/db";
import Wilaya from "../../../models/Wilaya";

const handler = nc();
handler
  .use(async (req: NextApiRequest, res: NextApiResponse, next) => {
    await dbConnect();
    next();
  })
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await Wilaya.find().select("-_id");
    res.status(200).json({ success: true, data });
  });

export default handler;
