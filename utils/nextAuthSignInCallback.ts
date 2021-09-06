import User from "../models/User";
import SendEmail from "./sendEmail";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";

const CustomSignInCallbackMethod = async (user: any, account: any) => {
  if (account.id === "login-credentials") {
    return;
  } else if (account.id === "register-credentials") {
    let svg = createAvatar(style, {
      seed: user.name,
    });

    const newuser = await User.create({
      account: account.type,
      verified: false,
      name: user.name,
      email: user.email,
      password: user.password,
      picture: svg,
      cart: {},
      wishlist: [],
    });
    const token = newuser.verifySignUpCredentials();
    await newuser.save();
    const url = `${process.env.NEXTAUTH_URL}/profile/verify/${token}`;
    const message = `
      <h1>Hello ${user.name},</h1>
      <p>In order to verify your account, you can simply follow <a href=${url} target='_blank' clicktracking='off'>this link</a>.</p>
    `;
    try {
      await SendEmail({
        from: process.env.SENDGRID_FROM,
        to: user.email,
        subject: "Account Verification",
        text: message,
      });
    } catch (error) {
      newuser.verified = false;
      newuser.verifyCredentialsToken = undefined;
      await newuser.save();
    }
  } else if (account.type === "oauth") {
    const getuser = await User.findOne({
      account: account.type,
      provider: account.provider,
      email: user.email,
    });
    if (!getuser) {
      await User.create({
        account: account.type,
        provider: account.provider,
        name: user.name,
        email: user.email,
        picture: user.image,
        cart: {},
        wishlist: [],
      });
    }
  }
};

export default CustomSignInCallbackMethod;
