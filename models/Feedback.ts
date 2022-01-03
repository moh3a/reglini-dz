const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  feedbackCount: {
    type: Number,
    default: 0,
  },
  averageRate: {
    type: Number,
    default: 0,
  },
  feedbackMessages: [
    {
      userPicture: mongoose.Mixed,
      userEmail: String,
      userName: String,
      userMessage: String,
      userRating: Number,
    },
  ],
});

const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
export default Feedback;
