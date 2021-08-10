require("dotenv").config();
import dbConnect from "../../../../config/db";

import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    const { email, account, provider } = req.body;
    if (account === "credentials") {
      const user = await User.findOne({ account, email });
      res
        .status(200)
        .json({ success: true, data: user, message: "User found." });
    }
    if (account === "oauth") {
      const user = await User.findOne({ account, email, provider });
      res
        .status(200)
        .json({ success: true, data: user, message: "User found." });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", status: 400 });
  }
}

// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// import dbConnect from "../../../../config/db";

// import type { NextApiRequest, NextApiResponse } from "next";

// import User from "../../../../models/User";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await dbConnect();
//   if (req.method === "GET") {
//     const token = req.headers.authorization;
//     // Check for token
//     if (!token)
//       return res
//         .status(401)
//         .json({ message: "No token, authorization denied", status: 401 });

//     try {
//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       // Add user from payload
//       const { id } = decoded;
//       const user = await User.findById(id).select("-password");
//       if (!user) throw Error("User does not exist");
//       res
//         .status(200)
//         .json({ success: true, user, message: "User found.", status: 200 });
//     } catch (e) {
//       res.status(400).json({ message: "Token is not valid", status: 400 });
//     }
//   } else {
//     res.status(400).json({ message: "Page doesn't exist.", status: 400 });
//   }
// }
