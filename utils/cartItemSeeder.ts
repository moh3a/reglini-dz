// MODULE USED IN DEVELOPMENT FOR QUICK SEEDING OF CART ITEMS IN DB

require("dotenv").config();
const connectDB = require("../config/db");

const axios = require("axios");

const CartItem = require("../models/CartItem");

const cartData = [
  {
    productId: "60f82e1d1e9498336864da0a",
    name: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    slug: "Acer-SB220Q-bi-21.5-inches-Full-HD-(1920-x-1080)-IPS-Ultra-Thin",
    description:
      "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    price: 599,
    quantity: 2,
    countInStock: 10,
    imageUrl: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  },
  {
    productId: "60f82e1d1e9498336864da04",
    name: "Apple iPhone 12",
    slug: "Apple-iPhone-12",
    description:
      "Welcome to a new era of iPhone. Beautifully bright 6.1-inch Super Retina XDR display.1 Ceramic Shield with 4x better drop performance.2 Incredible low-light photography with Night mode on all cameras. Cinema-grade Dolby Vision video recording, editing, and playback. Powerful A14 Bionic chip. And new MagSafe accessories for easy attach and faster wireless charging.3 Let the fun begin.",
    price: 1099,
    quantity: 3,
    countInStock: 10,
    imageUrl:
      "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020.jpg.landing-big_2x.jpg",
  },
  {
    productId: "60f82e1d1e9498336864da05",
    name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    slug: "Fjallraven-Foldsack-No.-1-Backpack-Fits-15-Laptops",
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    price: 109.95,
    quantity: 1,
    countInStock: 7,
    imageUrl: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
];

export const importData = async () => {
  await connectDB();
  try {
    await CartItem.deleteMany({});
    await CartItem.insertMany(cartData);
    console.log("Cart Items added successfully");
    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();
