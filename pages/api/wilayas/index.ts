require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import Wilaya from "../../../models/Wilaya";

const handler = nc();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await Wilaya.find();
  res.status(200).json({ success: true, data });
});

export default handler;
