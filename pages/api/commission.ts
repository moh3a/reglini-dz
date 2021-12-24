import dbConnect from "../../config/db";
import type { NextApiRequest, NextApiResponse } from "next";
import Finance from "../../models/Finance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const data = await Finance.findOne();
      res.status(200).json({ success: true, data });
    } catch (e) {
      res
        .status(400)
        .json({ success: false, message: "An error have occured." });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", success: false });
  }
}
