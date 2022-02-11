/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { DocumentAddIcon } from "@heroicons/react/outline";
import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";

import { selectUser } from "../../utils/redux/userSlice";
import { IBlog, selectBlogs } from "../../utils/redux/blogsSlice";
import { getBlogs, addComment } from "../../utils/redux/blogsAsyncActions";
import Avatar from "../elements/Avatar";

// const options: HTMLReactParserOptions = {
//   replace: (DOMNode) => {
//     if (!DOMNode) return;
//     if (DOMNode instanceof Element && DOMNode.attribs.name === "h1") {
//       return (
//         <h1 style={{ fontSize: 42, fontWeight: 50 }}>
//           {domToReact(DOMNode.children, options)}
//         </h1>
//       );
//     }

//     if (DOMNode instanceof Element && DOMNode.attribs.name === "h2") {
//       return (
//         <h2 style={{ fontSize: 30, fontWeight: 30 }}>
//           {domToReact(DOMNode.children, options)}
//         </h2>
//       );
//     }
//   },
// };

function AllBlogs() {
  const dispatch = useDispatch();
  const { blogs } = useSelector(selectBlogs);
  const { user } = useSelector(selectUser);
  const [comment, setComment] = useState("");
  const router = useRouter();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const commentHandler = (e: React.FormEvent, blogId: string) => {
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
          <div className="flex items-center">
            <div>
              <Avatar picture={user.picture} size="sm" />
            </div>
            <div className="ml-2 text-xl font-bold">{user.name}</div>
          </div>
          <div>
            <button
              onClick={() => router.push("/community/new")}
              className="py-1 px-2 rounded-lg text-white border border-b-4 border-green-600 bg-green-500"
            >
              <p>
                <DocumentAddIcon
                  className="w-5 h-5 inline mr-1"
                  aria-hidden="true"
                />{" "}
                write new blog
              </p>
            </button>
          </div>
        </div>
      )}

      <h1 className="text-2xl my-4 mx-4">Community blogs</h1>
      <div className="mx-2 my-6">
        {blogs ? (
          <div className="grid grid-cols-2 gap-y-4 md:grid-cols-3 gap-x-2 md:gap-x-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6">
            {blogs.map((blog: IBlog) => (
              <div
                key={blog._id}
                className="group cursor-pointer"
                onClick={() => router.push(`/community/blog/${blog.slug}`)}
              >
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden shadow-md ">
                  <div className="flex flex-col justify-evenly">
                    <div className="flex">
                      <div className="m-2">
                        {blog.userPicture && (
                          <Avatar picture={blog.userPicture} size="sm" />
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="font-semibold">{blog.userName}</span>
                        <br />
                        <small className="text-xs relative bottom-2">
                          {blog.createdAt?.substring(0, 10)}{" "}
                          {blog.createdAt?.substring(11, 16)}
                        </small>
                      </div>
                    </div>
                    <p className="mx-2 font-bold text-sm md:text-base">
                      <span className="bg-grim text-white">{blog.title}</span>
                    </p>
                    <p className="mx-2 h-8 overflow-hidden text-xs md:text-sm md:h-10">
                      <span className="bg-grim text-white">{blog.text}</span>
                    </p>
                  </div>
                </div>
              </div>

              // <div
              //   key={blog._id}
              //   className="my-2 mx-4 rounded-lg border border-gray-200 bg-gray-50 dark:border-yellow-200 dark:bg-grim"
              // >
              //   <a href={`/community/blog/${blog.slug}`}>

              //     <div className="flex flex-col md:flex-row md:justify-between">
              //       <h1 className="w-full text-xl font-bold mx-1">
              //         {blog.title}
              //       </h1>
              //       <p className="w-full  text-center md:text-right px-4">
              //         <span className="mx-4 text-sm font-semibold">
              //           {blog.votes} votes
              //         </span>
              //         <span className="mx-4 text-sm font-semibold">
              //           {blog.commentsCounter} comments
              //         </span>
              //       </p>
              //     </div>
              //     <div className="mb-3 border border-gray-100 bg-white dark:border-gray-100 dark:bg-gray-600 px-4 py-2 m-1 rounded-lg">
              //       {/* {blog.text && parse(blog.text, options)} */}
              //       {blog.text && parse(blog.text)}
              //     </div>
              //   </a>
              //   {blog.comments.length > 0 && (
              //     <h1 className="w-full text-lg font-bold mx-1">Comments:</h1>
              //   )}

              //   {user && (
              //     <form
              //       className="flex justify-between mx-2 md:mx-8 my-2"
              //       onSubmit={(e) => commentHandler(e, blog._id)}
              //     >
              //       <input
              //         className="w-full border border-gray-200 bg-gray-50 rounded-lg"
              //         type="text"
              //         placeholder="add a comment..."
              //         value={comment}
              //         onChange={(e) => setComment(e.target.value)}
              //       />
              //       <button
              //         type="submit"
              //         className="ml-1 py-1 px-2 rounded-lg text-white border border-b-4 border-green-600 bg-green-500"
              //       >
              //         comment
              //       </button>
              //     </form>
              //   )}
              //   {blog.comments.map((comment: any) => (
              //     <div key={comment._id} className="flex my-4">
              //       <div className="m-2 h-10 w-10">
              //         <img
              //           className="rounded-full"
              //           src={
              //             comment.userPicture
              //               ? comment.userPicture
              //               : "/placeholder.png"
              //           }
              //           alt={comment.userName}
              //         />
              //       </div>
              //       <div className="w-full">
              //         <p>
              //           <span className="font-semibold">{comment.userName}</span>{" "}
              //           -{" "}
              //           <span className="text-sm">
              //             {comment.createdAt.substring(0, 10)}{" "}
              //             {comment.createdAt.substring(11, 16)}
              //           </span>
              //         </p>
              //         <p>{comment.text}</p>
              //       </div>
              //     </div>
              //   ))}
              // </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center">Fetching community blogs...</div>
        )}
      </div>
    </>
  );
}

export default AllBlogs;
