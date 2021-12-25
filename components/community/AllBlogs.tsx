import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import Avatar from "../elements/Avatar";

function AllBlogs({ user }: any) {
  const [blogs, setBlogs] = useState<any>();
  const router = useRouter();

  const fetchBlogs = useCallback(async () => {
    const { data } = await axios.get("/api/community");
    if (data.success) {
      setBlogs(data.data);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

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
              className="py-1 px-2 rounded-lg border border-b-4 border-gray-300 bg-gray-200"
            >
              + write new blog
            </button>
          </div>
        </div>
      )}

      <h1 className="text-2xl my-4 mx-4">Community blogs</h1>

      {blogs ? (
        <div>
          {blogs.map((blog: any) => (
            <div
              key={blog._id}
              className="my-2 mx-4 rounded-lg border border-gray-200 bg-gray-50"
            >
              <div className="flex">
                <div className="m-2 h-12 w-12">
                  <Image
                    className="rounded-full"
                    src={
                      blog.userPicture ? blog.userPicture : "/placeholder.png"
                    }
                    alt={blog.userName}
                    width={500}
                    height={500}
                    layout="responsive"
                  />
                </div>
                <div className="mt-2">
                  <p>{blog.userName}</p>
                  <small>
                    {blog.createdAt.substring(0, 10)}{" "}
                    {blog.createdAt.substring(11, 16)}
                  </small>
                </div>
              </div>
              <p className="text-xl font-bold mx-1">{blog.title}</p>
              <p className="border border-gray-100 bg-white px-4 py-2 m-1 rounded-lg">
                {blog.text}
              </p>
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
