import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import {
  ChevronLeftIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";

import { createBlog } from "../../utils/redux/blogsAsyncActions";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

function CreateBlog() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && text) {
      dispatch(createBlog({ title, text }));
      router.push("/community");
    } else if (!text) {
      setError("You should add some content to your blog.");
      setInterval(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div>
      <h1 className="my-4 mx-4 md:mx-10 py-4 px-2 md:px-4 text-xl">
        <ChevronLeftIcon
          onClick={() => router.push("/community")}
          className="h-6 w-6 inline mr-3 cursor-pointer border dark:text-gray-300 dark:border-gray-300 text-black border-black rounded-full p-1"
          aria-hidden="true"
        />
        Create a new blog
      </h1>
      <form
        onSubmit={submitHandler}
        className="my-4 mx-4 md:mx-10 py-4 px-2 md:px-4 border border-gray-400 rounded-lg"
      >
        <div className="my-2">
          <label>Title</label>
          <input
            required
            maxLength={100}
            className="ml-4 border border-gray-200 bg-gray-50"
            type="text"
            placeholder="Blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* <div className="my-2">
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
        </div> */}
        {error && (
          <p className="text-red-500">
            <ExclamationCircleIcon
              className="h-5 w-5 inline"
              aria-hidden="true"
            />{" "}
            {error}{" "}
          </p>
        )}
        <QuillNoSSRWrapper
          className="my-2"
          placeholder="Here goes the body of your blog"
          value={text}
          onChange={setText}
          modules={modules}
          formats={formats}
          theme="snow"
        />
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
