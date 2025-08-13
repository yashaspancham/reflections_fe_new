"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import FontFamily from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import { useRouter } from "next/navigation";
import { uploadToS3 } from "@/APIs/S3/uploadToS3";
import { iSImage } from "@/utils/images";
import { toasting } from "@/utils/toast";

export default function EntryPage() {
  const router = useRouter();
  const [_, setEditorState] = useState({});
  const [stagedImages, setStagedImages] = useState<
    { file: File; preview: string }[]
  >([]);
  const [stagedVideos, setStagedVideos] = useState<
    { file: File; preview: string }[]
  >([]);

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
      Image,
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
      <div className="fixed z-10 flex flex-wrap gap-3 justify-between mb-4 bg-white rounded-lg">
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
          <button
            className="hover:bg-gray-100 rounded-sm p-2"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.multiple = true;
              input.onchange = async () => {
                const files = Array.from(input.files || []);
                if (stagedImages.length + files.length > 10) {
                  toasting("Maximum of 10 images only.", "error");
                  return;
                }

                for (const file of files) {
                  const ext = file.name.split(".").pop()?.toLowerCase();
                  if (!iSImage(ext)) continue;

                  const preview = await new Promise<string>(
                    (resolve, reject) => {
                      const reader = new FileReader();
                      reader.onload = () => resolve(reader.result as string);
                      reader.onerror = reject;
                      reader.readAsDataURL(file);
                    }
                  );

                  editor?.chain().focus().setImage({ src: preview }).run();

                  setStagedImages((prev) => [...prev, { file, preview }]);
                }
              };
              input.click();
            }}
          >
            Image
          </button>
          <button
            className="hover:bg-gray-100 rounded-sm p-2"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "video/*";
              input.multiple = true;
              input.onchange = async () => {
                const files = Array.from(input.files || []);

                if (stagedVideos.length + files.length > 5) {
                  toasting("maximum of 5 videos Only.","error");
                  return;
                }

                for (const file of files) {
                  const ext = file.name.split(".").pop()?.toLowerCase();
                  if (
                    !["mp4", "webm", "ogg", "mov", "avi", "mkv"].includes(
                      ext || ""
                    )
                  )
                    continue;

                  const preview = URL.createObjectURL(file); // works for videos without loading into memory

                  // Insert video into your editor
                  editor?.chain().focus().setVideo({ src: preview }).run?.();

                  // Save to staged videos
                  setStagedVideos((prev) => [...prev, { file, preview }]);
                }
              };
              input.click();
            }}
          >
            Video
          </button>

          <select
            onChange={(e) => {
              editor.chain().focus().setFontFamily(e.target.value).run();
              editor.commands.setTextSelection({
                from: editor.state.selection.to + 1,
                to: editor.state.selection.to + 1,
              });
            }}
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
        className="ProseMirror min-h-[300px] sm:pt-24 pt-[200px]"
      />
    </div>
  );
}
