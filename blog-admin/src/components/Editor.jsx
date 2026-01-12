import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (value !== undefined) setContent(value);
  }, [value]);

  const handleEditorChange = (newValue) => {
    setContent(newValue);
    if (onChange) onChange(newValue);
  };

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <Editor
        apiKey="uy0676z6x54znnh50cpud71woi6azzuuj5x3vsda0i7wt1cq"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={content}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
