"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import FontFamily from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import { useRouter } from "next/navigation";

export default function EntryPage() {
  const router = useRouter();
  const [_, setEditorState] = useState({});
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Bold,
      Italic,
      Underline,
      TextStyle,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: "Put down your thoughts here...",
        showOnlyWhenEditable: true,
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: "",
    immediatelyRender: false,
    onUpdate: () => setEditorState({}),
    onSelectionUpdate: () => setEditorState({}),
  });

  if (!editor) return null;

  return (
    <div className="sm:p-10 p-5">
      <div className="flex flex-wrap gap-3 justify-between mb-4">
        <div className="flex flex-wrap gap-3">
          <button
            className="p-2 bg-blue-800 hover:bg-blue-700 rounded-lg text-white"
            onClick={() => router.push("/entries")}
          >
            Return
          </button>
          <button
            className={`${
              editor.isActive("bold") ? "bg-gray-200" : ""
            } font-bold rounded-sm p-2`}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            B
          </button>
          <button
            className={`${
              editor.isActive("italic") ? "bg-gray-200" : ""
            } italic rounded-sm p-2`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            I
          </button>
          <button
            className={`${
              editor.isActive("underline") ? "bg-gray-200" : ""
            } underline rounded-sm p-2`}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            U
          </button>
          <button
            onClick={() => {
              const url = prompt("Enter URL");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
          >
            Link
          </button>
          <select
            onChange={(e) =>
              editor.chain().focus().setFontFamily(e.target.value).run()
            }
            defaultValue=""
          >
            <option value="" disabled>
              Default
            </option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
            <option value="Inter">Inter</option>
            <option value="Merriweather">Merriweather</option>
            <option value="Roboto Mono">Roboto Mono</option>
          </select>
          <select
            className="rounded p-1"
            onChange={(e) => {
              const level = parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6;
              if (level) {
                editor.chain().focus().toggleHeading({ level }).run();
              } else {
                editor.chain().focus().setParagraph().run();
              }
            }}
            value={
              ([1, 2, 3, 4, 5, 6] as const).find((l) =>
                editor.isActive("heading", { level: l })
              ) || ""
            }
          >
            <option value="">Paragraph</option>
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <option key={level} value={level}>
                h{level}
              </option>
            ))}
          </select>
        </div>
          <button className="p-2 bg-blue-800 hover:bg-blue-700 rounded-lg text-white">
            Save
          </button>
      </div>

      <EditorContent
        editor={editor}
        className="ProseMirror min-h-[300px] p-5"
      />
    </div>
  );
}
