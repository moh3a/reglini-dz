/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { selectBlogs } from "../../utils/redux/blogsSlice";
import { getBlogs, addComment } from "../../utils/redux/blogsAsyncActions";
import Avatar from "../elements/Avatar";

function AllBlogs({ user }: any) {
  const dispatch = useDispatch();
  const { blogs } = useSelector(selectBlogs);
  const [comment, setComment] = useState("");
  const router = useRouter();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const commentHandler = (e: any, blogId: string) => {
    e.preventDefault();
    if (comment) {
      dispatch(addComment({ blogId, text: comment }));
    }
    setComment("");
  };

  return (
    <>
      <div className="text-white bg-red-500 py-6 text-center font-bold text-2xl select-none">
        UNDER DEVELOPMENT !
      </div>
      {user && (
        <div className="flex justify-around w-full py-8">
          <div className="flex">
            <div>
              <Avatar user={user} size="sm" />
            </div>
            <div className="ml-2 text-xl font-bold">{user.name}</div>
          </div>
          <div>
            <button
              onClick={() => router.push("/community/new")}
              className="py-1 px-2 rounded-lg text-white border border-b-4 border-green-600 bg-green-500"
            >
              <p className="relative bottom-1">
                <span className="text-2xl font-semibold">+</span> write new blog
              </p>
            </button>
          </div>
        </div>
      )}

      <h1 className="text-2xl my-4 mx-4">Community blogs</h1>

      {blogs ? (
        <div className="my-6">
          {blogs.map((blog: any) => (
            <div
              key={blog._id}
              className="my-2 mx-4 rounded-lg border border-gray-200 bg-gray-50 dark:border-yellow-200 dark:bg-grim"
            >
              <div className="flex">
                <div className="m-2 h-12 w-12">
                  <img
                    className="rounded-full"
                    src={
                      blog.userPicture ? blog.userPicture : "/placeholder.png"
                    }
                    alt={blog.userName}
                  />
                </div>
                <div className="mt-2">
                  <p className="font-semibold">{blog.userName}</p>
                  <small>
                    {blog.createdAt.substring(0, 10)}{" "}
                    {blog.createdAt.substring(11, 16)}
                  </small>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between">
                <h1 className="w-full text-xl font-bold mx-1">{blog.title}</h1>
                <p className="w-full md:w-36 text-center md:text-right px-4">
                  {blog.votes} votes
                </p>
              </div>
              <p className="mb-3 border border-gray-100 bg-white dark:border-gray-100 dark:bg-gray-600 px-4 py-2 m-1 rounded-lg">
                {blog.text}
              </p>
              {blog.comments.length > 0 && (
                <h1 className="w-full text-lg font-bold mx-1">Comments:</h1>
              )}

              {user && (
                <form
                  className="flex justify-between mx-2 md:mx-8 my-2"
                  onSubmit={(e) => commentHandler(e, blog._id)}
                >
                  <input
                    className="w-full border border-gray-200 bg-gray-50 rounded-lg"
                    type="text"
                    placeholder="add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="ml-1 py-1 px-2 rounded-lg text-white border border-b-4 border-green-600 bg-green-500"
                  >
                    comment
                  </button>
                </form>
              )}
              {blog.comments.map((comment: any) => (
                <div key={comment._id} className="flex my-4">
                  <div className="m-2 h-10 w-10">
                    <img
                      className="rounded-full"
                      src={
                        comment.userPicture
                          ? comment.userPicture
                          : "/placeholder.png"
                      }
                      alt={comment.userName}
                    />
                  </div>
                  <div className="w-full">
                    <p>
                      <span className="font-semibold">{comment.userName}</span>{" "}
                      -{" "}
                      <span className="text-sm">
                        {comment.createdAt.substring(0, 10)}{" "}
                        {comment.createdAt.substring(11, 16)}
                      </span>
                    </p>
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-4 text-center">Fetching community blogs...</div>
      )}
    </>
  );
}

export default AllBlogs;
