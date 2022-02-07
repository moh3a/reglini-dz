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
    sku: String,
    price: {
      type: Number,
      required: true,
    },
    originalPrice: Number,
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
    carrierId: {
      type: String,
      required: true,
    },
    shippingPrice: Number,
    totalPrice: Number,
  },
  {
    timestamps: true,
  }
);

const WishlistSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

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

const AddressSchema = new mongoose.Schema({
  text: String,
  postalCode: String,
  wilaya: String,
  daira: String,
  commune: String,
  streetName: String,
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: String,
    product: {
      productId: String,
      name: String,
      sku: String,
      price: Number,
      shippingPrice: Number,
      totalPrice: Number,
      imageUrl: String,
      properties: [{}],
      quantity: {
        type: Number,
        min: [1, "Quantity cannot be less than 1."],
      },
      carrierId: String,
      orderMemo: String,
    },
    shippingAddress: {
      name: String,
      countryCode: String,
      city: String,
      zipCode: String,
      addressLine1: String,
      phoneCountry: String,
      mobilePhone: String,
      province: String,
    },
    details: {
      gmt_create: String,
      order_status: String,
      logistics_status: String,
      order_amount: {
        amount: String,
        currency_code: String,
      },
      child_order_list: {
        aeop_child_order_info: [
          {
            product_id: Number,
            product_price: {
              amount: String,
              currency_code: String,
            },
            product_name: String,
            product_count: Number,
          },
        ],
      },
      logistics_info_list: {
        ae_order_logistics_info: [
          {
            logistics_no: String,
            logistics_service: String,
          },
        ],
      },
      store_info: {
        store_id: Number,
        store_name: String,
        store_url: String,
      },
    },
    tracking: {
      hasTracking: { type: Boolean, default: false },
      details: [
        {
          event_desc: String,
          signed_name: String,
          status: String,
          address: String,
          event_date: String,
        },
      ],
      official_website: String,
    },
    currency: String,
    payment: {
      hasTimedOut: {
        type: Boolean,
        default: false,
      },
      isPaymentConfirmed: {
        type: Boolean,
        default: false,
      },
      wasDeclined: Boolean,
      receipt: String,
      paymentMethod: {
        type: String,
        enum: ["ccp", "cib"],
      },
      paymentTime: String,
    },
    packageReceived: {
      wasReceived: {
        type: Boolean,
        default: false,
      },
      packagePicture: String,
    },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    index: true,
  },
  realName: String,
  email: {
    type: String,
    required: [true, "Please provide an email address."],
    lowercase: true,
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
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  picture: mongoose.Mixed,
  address: AddressSchema,
  phoneNumber: String,
  cart: {
    type: CartSchema,
    required: true,
  },
  blogs: [{ blogId: mongoose.SchemaTypes.ObjectId }],
  wishlist: [WishlistSchema],
  orders: [OrderSchema],
  aeCredentials: {
    token: String,
    user_id: String,
    user_nick: String,
    expire_time: Number,
  },
  facebookPages: [
    {
      page_id: mongoose.SchemaTypes.ObjectId,
      page_name: String,
      page_url: String,
      instagram_page_linked: {
        type: Boolean,
        default: false,
      },
      access_status: {
        type: String,
        enum: [
          "processing_demand",
          "access_request_sent",
          "processing_validation",
          "access_granted",
          "processing_deletion",
        ],
      },
      page_ads: [
        {
          ad_status: {
            type: String,
            enum: [
              "request_new_ad",
              "awaiting_payment",
              "processing_payment",
              "ad_success",
              "ad_fail",
            ],
          },
          created_at: String,
          ad_emplacement: String,
          post_url: String,
          ad_audience: String,
          ad_duration: Number,
          ad_daily_bugdet: Number,
          ad_total_budget: Number,
          ad_price: Number,
          payment: {
            wasDeclined: Boolean,
            receipt: String,
            paymentMethod: String,
            paymentTime: String,
          },
        },
      ],
    },
  ],
});

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

const jwt = require("jsonwebtoken");

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

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
