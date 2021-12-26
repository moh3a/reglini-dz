import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { createBlog } from "../../utils/redux/blogsAsyncActions";

function CreateBlog({ user }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (title && text) {
      dispatch(createBlog({ title, text }));
      router.push("/community");
    }
  };

  return (
    <div>
      <h1 className="my-4 mx-4 md:mx-10 py-4 px-2 md:px-4 text-xl">
        Create a new blog
      </h1>
      <form
        onSubmit={submitHandler}
        className="my-4 mx-4 md:mx-10 py-4 px-2 md:px-4 border border-gray-400 rounded-lg"
      >
        <div className="my-2">
          <label>Title</label>
          <input
            className="ml-4 rounded-lg border border-gray-200 bg-gray-50"
            type="text"
            placeholder="Blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-2">
          <label>Blog body</label>
          <br />
          <textarea
            lang=""
            className="w-full rounded-lg border border-gray-200 bg-gray-50"
            rows={8}
            placeholder="Here goes the body of your blog"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="border border-green-400 bg-green-300 hover:bg-green-400 px-2 py-1 rounded-lg"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
