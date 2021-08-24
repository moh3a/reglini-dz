const path = require("path");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "tailwindui.com",
      "unsplash.com",
      "googleusercontent.com",
      "fbsbx.com",
      "alicdn.com",
      "ae01.alicdn.com",
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
