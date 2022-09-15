import type { NextApiResponse } from "next";
import nc from "next-connect";

import User from "../../../../../models/User";
import CheckSession from "../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../types";

const handler = nc();
handler
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { productId, name, price, imageUrl } = req.body;
    const data = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });
    const index = data.wishlist.findIndex(
      (item: any) => item.productId === productId
    );
    if (index === -1) {
      data.wishlist.push({
        productId,
        name,
        price,
        imageUrl,
      });
      await data.save();
      res.status(201).json({
        success: true,
        data,
        message: "Item successfully added to wishlist.",
        status: 201,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Item is already in the wishlist.",
      });
    }
  });

export default handler;

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await dbConnect();
//   const session: IUser | null = await getSession({ req });

//   if (req.method === "POST") {
//     const { productId, name, price, imageUrl } = req.body;
//     try {
//       if (!session) {
//         res.status(403).json({ message: "Unauthorized to access this part." });
//       } else if (session.user) {
//         const email = session.user.email;
//         const account = session.user.type;
//         let provider: IUser["user.provider"];
//         if (account === "oauth") {
//           provider = session.user.provider;
//         }
//         const data = await User.findOne({
//           account,
//           email,
//           provider: provider || undefined,
//         });
//         if (!data)
//           res
//             .status(400)
//             .json({ success: false, message: "User does not exist" });
// const index = data.wishlist.findIndex(
//   (item: any) => item.productId === productId
// );
// if (index === -1) {
//   data.wishlist.push({
//     productId,
//     name,
//     price,
//     imageUrl,
//   });
//   await data.save();
//   res.status(201).json({
//     success: true,
//     data,
//     message: "Item successfully added to wishlist.",
//     status: 201,
//   });
// } else {
//   res.status(200).json({
//     success: false,
//     message: "Item is already in the wishlist.",
//   });
// }
//       }
//     } catch (error: any) {
//       res
//         .status(500)
//         .json({ message: error.message, success: false, status: 500 });
//     }
//   } else {
//     res
//       .status(400)
//       .json({ message: "Page doesn't exist.", success: false, status: 400 });
//   }
// }
