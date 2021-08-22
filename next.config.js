const path = require("path");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "https://tailwindui.com/img",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  // INTERNATIONALIZATION - SUPPORT OF MULTIPLE LANGUAGES
  i18n: {
    locales: ["en", "fr", "ar"],
    defaultLocale: "en",
  },
};
