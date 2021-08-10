// MODULE USED FOR SENDING AN /API/AUTH RESPONSE BACK WITH THE TOKEN

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res
    .status(statusCode)
    .json({ success: true, token, message: "User logged in." });
};

export default sendToken;
