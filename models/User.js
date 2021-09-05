const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    properties: {
      type: [{}],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity cannot be less than 1."],
    },
    shipping: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WishlistSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const CartSchema = new mongoose.Schema(
  {
    cartItems: [ItemSchema],
    subtotal: {
      type: Number,
      default: 0,
    },
    count: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Please provide a username."],
    lowercase: true,
    // unique: true,
    index: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email address."],
    lowercase: true,
    // unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    index: true,
  },
  role: {
    type: String,
    enum: ["basic", "seller", "admin"],
    default: "basic",
    lowercase: true,
  },
  account: {
    type: String,
    enum: ["credentials", "oauth"],
    lowercase: true,
    required: true,
  },
  provider: {
    type: String,
    enum: ["facebook", "instagram", "google", "auth0"],
    lowercase: true,
  },
  verified: Boolean,
  verifyCredentialsToken: String,
  password: {
    type: String,
    // required: [true, "Please add a password."],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  picture: String,
  cart: {
    type: CartSchema,
    required: true,
  },
  wishlist: [WishlistSchema],
});

// MIDDLEWARE TO BE USED BEFORE CREATING A NEW PASSWORD
// USE BCRYPT TO HASH THE CLIENT ENTERED PASSWORD THEN SAVE IT IN DB
UserSchema.pre("save", async function (next) {
  // the function keyword must be used and not the arrow function
  // CHECK IF PASSWORD HAS ALREADY BEEN HASHED
  // CONTINUE WITHOUT MODOFYING
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// MONGOOSE SUPPORTS CREATING METHODS ON CREATED USERS
// METHOD TO CHECK IF THE ENTERED PASSWORD MATCHES THE ON IN THE DB
UserSchema.methods.matchPasswords = async function (password) {
  // the function keyword must be used and not the arrow function
  return await bcrypt.compare(password, this.password);
};

// CREATE A JWT FOR THE CLIENT
const jwt = require("jsonwebtoken");
UserSchema.methods.getSignedToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET, // SECRET
    { expiresIn: process.env.JWT_EXPIRE } // OPTIONS
  );
};

// GENERTE A RESET TOKEN AND EXPIRES IN 10 MIN
const crypto = require("crypto");
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

UserSchema.methods.verifySignUpCredentials = function () {
  if (!this.verified) {
    const verifyToken = crypto.randomBytes(20).toString("hex");
    this.verifyCredentialsToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");
    return verifyToken;
  }
};

// ADD A UNIQUE VALIDATION TO THE EMAIL AND USERNAME FIELDS
// UserSchema.plugin(uniqueValidator, { message: "is already taken." });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
