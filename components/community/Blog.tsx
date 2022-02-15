/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  ChevronLeftIcon,
  HeartIcon,
  DotsVerticalIcon,
  TrashIcon,
  ChatIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/solid";
import parse from "html-react-parser";
import { Menu, Transition } from "@headlessui/react";

import Avatar from "../elements/Avatar";
import { IBlog, selectBlogs } from "../../utils/redux/blogsSlice";
import {
  deleteBlog,
  addComment,
  deleteComment,
  blogLike,
} from "../../utils/redux/blogAsyncActions";
import { selectUser } from "../../utils/redux/userSlice";
import { IUserRedux } from "../../utils/types";
import BlogComment from "./BlogComment";

const Blog = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user }: { user: IUserRedux } = useSelector(selectUser);
  const { blog }: { blog: IBlog } = useSelector(selectBlogs);

  const [comment, setComment] = useState("");

  const commentHandler = (e: React.FormEvent, blogId: string) => {
    e.preventDefault();
    if (comment) {
      dispatch(addComment({ blogId, text: comment }));
    }
    setComment("");
  };

  return (
    <div className="py-10 px-2 max-w-4xl mx-auto">
      {blog && blog.userId && (
        <>
          <div className="flex justify-between">
            <div className="flex items-center">
              <div>
                <ChevronLeftIcon
                  onClick={() => router.push("/community")}
                  className="h-6 w-6 inline mr-3 cursor-pointer border dark:text-gray-300 dark:border-gray-300 text-black border-black rounded-full p-1"
                  aria-hidden="true"
                />
              </div>
              <div>
                {blog.userPicture && (
                  <Avatar picture={blog.userPicture} size="sm" />
                )}
              </div>
              <div className="ml-2">
                <p>{blog.userName}</p>
                {blog.createdAt && (
                  <p className="text-xs">
                    {blog.createdAt.substring(0, 10)}{" "}
                    {blog.createdAt.substring(11, 16)}
                  </p>
                )}
              </div>
            </div>
            <Menu as="div" className="relative z-100">
              <div>
                <Menu.Button className="h-6 w-6 cursor-pointer relative top-2">
                  <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-1 w-40 md:w-52 mt-2 bg-gray-100 dark:bg-grim divide-y divide-gray-100 rounded-lg shadow-md">
                  {blog && user && blog.userId === user._id && (
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              dispatch(deleteBlog({ id: blog._id }));
                              router.push("/community");
                            }}
                            className={`${
                              active && "bg-gray-200 dark:bg-gray-600"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            <TrashIcon
                              className="w-5 h-5 inline mr-1 text-red-500"
                              aria-hidden="true"
                            />
                            Delete this blog
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="text-4xl md:text-8xl font-bold my-8 md:my-24">
            {blog.title}
          </div>
          <div className="my-8 md:my-16">{blog.text && parse(blog.text)}</div>

          {/* interactions block */}
          <div className="my-4 flex justify-around items-center">
            <div
              onClick={() => {
                if (user && user.name) dispatch(blogLike({ blogId: blog._id }));
              }}
              className={`flex items-center px-3 py-1 rounded-full cursor-pointer hover:underline hover:border`}
            >
              {blog.voters?.find(
                (voter) => user && voter.userId === user._id
              ) ? (
                <SolidHeartIcon
                  className="w-6 h-6 mr-2 text-red-500"
                  aria-hidden="true"
                />
              ) : (
                <HeartIcon
                  className="w-6 h-6 mr-2 text-red-500"
                  aria-hidden="true"
                />
              )}
              <div>{blog.votes} likes</div>
            </div>
            <div className="flex items-center">
              <ChatIcon
                className="w-6 h-6 mr-2 text-gray-500"
                aria-hidden="true"
              />
              <div>{blog.commentsCounter} comments</div>
            </div>
          </div>

          {/* comments block */}
          {(user || (blog.comments && blog.comments.length > 0)) && (
            <h1 className="w-full text-lg font-bold mx-1">Comments:</h1>
          )}

          {user && (
            <form
              className="flex w-full mx-2 my-2"
              onSubmit={(e) => commentHandler(e, blog._id as string)}
            >
              <input
                className="w-full pr-7 border border-gray-200 bg-gray-50 dark:bg-grim rounded-lg ring-0 focus:ring-green-500 focus:border-green-500"
                type="text"
                placeholder="add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button className="relative right-7" type="submit">
                <PlusCircleIcon
                  className="w-6 h-6 mr-2 text-green-500"
                  aria-hidden="true"
                />
              </button>
            </form>
          )}

          {blog.comments &&
            blog.comments.map((comment) => (
              <BlogComment key={comment._id} comment={comment} />
            ))}
        </>
      )}
    </div>
  );
};

export default Blog;
