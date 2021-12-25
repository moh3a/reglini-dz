import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: mongoose.SchemaTypes.ObjectId,
    text: String,
    votes: { type: Number, default: 0 },
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
    votes: { type: Number, default: 0 },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;
