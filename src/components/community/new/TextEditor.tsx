import dynamic from "next/dynamic";
import React from "react";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [
      // { header: "1" },
      // { header: "2" },
      { font: [] },
    ],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      // { indent: "-1" },
      // { indent: "+1" },
    ],
    [
      "link",
      "image",
      // "video"
    ],
    // ["clean"],
  ],
  // syntax: true, // requires highlight.js
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  // "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const TextEditor = ({ text, setText }: { text: string; setText: any }) => {
  return (
    <QuillNoSSRWrapper
      className="my-8 bg-white text-black"
      placeholder="Here goes the body of your blog"
      value={text}
      onChange={setText}
      modules={modules}
      formats={formats}
      theme="snow"
    />
  );
};

export default TextEditor;
