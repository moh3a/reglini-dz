import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: mongoose.SchemaTypes.ObjectId,
    userName: String,
    userPicture: String,
    text: String,
    votes: { type: Number, default: 0 },
    voters: [{ userId: mongoose.SchemaTypes.ObjectId }],
  },
  { timestamps: true }
);

export const BlogSchema = new mongoose.Schema(
  {
    userId: mongoose.SchemaTypes.ObjectId,
    userName: String,
    userPicture: String,
    slug: String,
    title: String,
    text: String,
    raw_text: String,
    votes: { type: Number, default: 0 },
    voters: [{ userId: mongoose.SchemaTypes.ObjectId }],
    comments: [CommentSchema],
    commentsCounter: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;
