import User from "../models/User";

const CustomSignInCallbackMethod = async (user: any, account: any) => {
  if (account.type === "credentials") {
    const getuser = await User.findOne({
      account: account.type,
      email: user.email,
    });
    if (!getuser) {
      await User.create({
        account: account.type,
        verified: false,
        name: user.name,
        email: user.email,
        password: user.password,
        cart: {},
        wishlist: [],
      });
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
