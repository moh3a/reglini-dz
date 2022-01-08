import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import User from "../../../models/User";
import CustomSignInCallbackMethod from "../../../utils/nextAuthSignInCallback";

export default NextAuth({
  providers: [
    Providers.Credentials({
      id: "login-credentials",
      name: "Login",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await User.findOne({
          account: "credentials",
          email: credentials.email,
        }).select("+password");
        if (user) {
          const isMatch = await user.matchPasswords(credentials.password);
          if (!isMatch) {
            throw `/login/${"invalid_credentials"}`;
          }
          return user;
        } else {
          throw `/login/${"user_not_found"}`;
        }
      },
    }),
    Providers.Credentials({
      id: "register-credentials",
      name: "Register",
      credentials: {
        name: { label: "name", type: "text" },
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const checkname = await User.findOne({
          account: "credentials",
          name: credentials.name,
        });
        if (checkname) {
          throw `/register/${"username_taken"}`;
        }
        const checkemail = await User.findOne({
          account: "credentials",
          email: credentials.email,
        });
        if (checkemail) {
          throw `/register/${"email_exists"}`;
        }
        if (!credentials.name) {
          credentials.name = credentials.email.split("@")[0];
        }
        const user = {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    // generic auth0 provider for testing purposes
    // Providers.Auth0({
    //   clientId: process.env.AUTH0_GCLIENT_ID,
    //   clientSecret: process.env.AUTH0_GCLIENT_SECRET,
    //   domain: process.env.AUTH0_GDOMAIN,
    // }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Instagram({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_SECRET,
    }),
    // Providers.Email({
    //   server: {
    //     host: process.env.SENDGRID_SMTP_SERVER_HOST,
    //     port: process.env.SENDGRID_SMTP_SERVER_PORT,
    //     auth: {
    //       user: process.env.SENDGRID_SMTP_USERNAME,
    //       pass: process.env.SENDGRID_SMTP_PASSWORD,
    //     },
    //   },
    //   from: process.env.SENDGRID_FROM,
    // }),
    // ...add more providers here
  ],
  callbacks: {
    signIn(user, account, profile) {
      CustomSignInCallbackMethod(user, account);
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return "/login/blocked_from_signing_up";
      }
    },
    async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      if (account) {
        const { type } = account;
        if (type === "credentials") {
          token = {
            ...token,
            type,
          };
        } else if (type === "oauth") {
          const { provider } = account;
          token = {
            ...token,
            type,
            provider,
            accessToken: account.accessToken,
          };
        }
      }
      return token;
    },
    async session(session, token) {
      // Add property to session, like an access_token from a provider.
      session.user = token;
      return session;
    },
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    // verifyRequest,
    // newUser,
    // signOut,
    signIn: "/login",
  },
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  // A database is optional, but required to persist accounts in a database
  // database: process.env.MONGO_URI,
});
