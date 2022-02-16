/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { DocumentAddIcon } from "@heroicons/react/outline";

import { selectUser } from "../../utils/redux/userSlice";
import { IBlog, selectBlogs } from "../../utils/redux/blogsSlice";
import { getBlogs } from "../../utils/redux/blogsAsyncActions";
import Avatar from "../elements/Avatar";

function AllBlogs() {
  const dispatch = useDispatch();
  const { blogs } = useSelector(selectBlogs);
  const { user } = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

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
      <div className="mx-4 my-6">
        {blogs ? (
          <div className="grid grid-cols-2 gap-y-4 md:grid-cols-3 gap-x-2 md:gap-x-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-6">
            {blogs.map((blog: IBlog) => (
              <div key={blog._id} className="group cursor-pointer">
                <a href={`/community/blog/${blog.slug}`}>
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 dark:bg-grim rounded-lg overflow-hidden shadow-md ">
                    <div
                      className={`h-1 w-full ${
                        blog.category === "other"
                          ? "bg-green-600"
                          : blog.category === "dev"
                          ? "bg-indigo-600"
                          : blog.category === "news"
                          ? "bg-red-600"
                          : blog.category === "question"
                          ? "bg-orange-600"
                          : ""
                      }`}
                    />
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
                        <span
                          className={`px-2 rounded-lg text-xs ${
                            blog.category === "other"
                              ? "bg-green-200 border text-green-800 border-green-600 dark:text-green-50  dark:bg-green-600"
                              : blog.category === "dev"
                              ? "bg-indigo-200 border text-indigo-800 border-indigo-600 dark:text-indigo-50  dark:bg-indigo-600"
                              : blog.category === "news"
                              ? "bg-red-200 border text-red-800 border-red-600 dark:text-red-50  dark:bg-red-600"
                              : blog.category === "question"
                              ? "bg-orange-200 border text-orange-800 border-orange-600 dark:text-orange-50  dark:bg-orange-600"
                              : ""
                          }`}
                        >
                          {blog.category}
                        </span>
                        <br />
                        <span>{blog.title}</span>
                      </p>
                      <p className="mx-2 h-8 overflow-hidden text-xs md:text-sm md:h-10">
                        <span>{blog.raw_text}</span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
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
