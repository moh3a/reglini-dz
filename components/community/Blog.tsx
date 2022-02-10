/* eslint-disable @next/next/no-img-element */
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/outline";

import { IBlog, selectBlogs } from "../../utils/redux/blogsSlice";
import Avatar from "../elements/Avatar";

const Blog = () => {
  const router = useRouter();
  const { blog }: { blog: IBlog } = useSelector(selectBlogs);

  return (
    <div className="py-10 px-2">
      {blog && (
        <>
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
          <div className="text-2xl md:text-4xl font-bold my-3">
            {blog.title}
          </div>
          <div>content</div>
        </>
      )}
    </div>
  );
};

export default Blog;
