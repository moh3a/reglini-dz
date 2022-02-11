/* eslint-disable @next/next/no-img-element */
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import parse from "html-react-parser";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/outline";

import { IBlog, selectBlogs } from "../../utils/redux/blogsSlice";
import Avatar from "../elements/Avatar";
import { Fragment } from "react";
import { deleteBlog } from "../../utils/redux/blogAsyncActions";

const Blog = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { blog }: { blog: IBlog } = useSelector(selectBlogs);

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
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="text-2xl md:text-4xl font-bold my-3">
            {blog.title}
          </div>
          <div>{blog.text && parse(blog.text)}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
