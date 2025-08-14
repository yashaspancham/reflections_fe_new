"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import FontFamily from "@tiptap/extension-font-family";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import { TextStyle, Color } from "@tiptap/extension-text-style";
import { uploadToS3 } from "@/APIs/S3/uploadToS3";
import { iSImage } from "@/utils/images";
import { toasting } from "@/utils/toast";
import BulletLogo from "@/components/entryComponents/BulletLogo";
import NumberedListLogo from "@/components/entryComponents/NumberedListLogo";
import { saveEntry } from "@/APIs/entryAPI/saveEntry"


export default function EntryPage() {
  const router = useRouter();
  const [_, setEditorState] = useState({});
  const [stagedImages, setStagedImages] = useState<
    { file: File; preview: string }[]
  >([]);
  const [disableSaveButtom, setDisableSaveButtom] = useState<boolean>(false);
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
      BulletList,
      OrderedList,
      ListItem,
      Paragraph,
      Color,
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

  const handleSaveContentEntry = () => {
    const entryContent = editor.getHTML();
    const textOnly = entryContent
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, "")
      .replace(/\s+/g, "")
      .trim();
    if (!textOnly) {
      toasting("Nothing to save", "error");
      setDisableSaveButtom(false)
      return;
    }
    saveEntry(entryContent).then(()=>setDisableSaveButtom(false));
  };

  return (
    <div className="sm:p-10 p-5">
      <div className="fixed z-10 flex flex-wrap gap-3 justify-between mb-4 bg-white rounded-lg">
        <button
          className="p-2 bg-blue-800 hover:bg-blue-700 rounded-lg text-white"
          onClick={() => router.push("/entries")}
        >
          Return
        </button>
        <button
          className={`${editor.isActive("bold") ? "bg-gray-200" : ""
            } font-bold rounded-sm p-2`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button
          className={`${editor.isActive("italic") ? "bg-gray-200" : ""
            } italic rounded-sm p-2`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>
        <button
          className={`${editor.isActive("underline") ? "bg-gray-200" : ""
            } underline rounded-sm p-2`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          U
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`${editor?.isActive("bulletList") ? "bg-gray-200" : ""
            }  p-2 rounded-sm`}
        >
          <BulletLogo />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`${editor?.isActive("orderedList") ? "bg-gray-200" : ""
            }  p-2 rounded-sm`}
        >
          <NumberedListLogo />
        </button>
        {/* <button
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          Link
        </button> */}
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

                const preview = await new Promise<string>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(reader.result as string);
                  reader.onerror = reject;
                  reader.readAsDataURL(file);
                });

                editor?.chain().focus().setImage({ src: preview }).run();

                setStagedImages((prev) => [...prev, { file, preview }]);
              }
            };
            input.click();
          }}
        >
          Image
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
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <span
            className="font-bold text-lg"
            style={{
              color: editor.getAttributes("textStyle").color || "#000",
            }}
          >
            text Color
          </span>
          <input
            type="color"
            className="w-0 h-0 opacity-0 absolute"
            onInput={(e) => {
              const color = (e.target as HTMLInputElement).value;
              editor.chain().focus().setColor(color).run();
            }}
          />
        </label>
        <button
          disabled={disableSaveButtom}
          onClick={() => { setDisableSaveButtom(true); handleSaveContentEntry() }}
          className={`p-2 ${disableSaveButtom?"bg-gray-300":"bg-blue-800 hover:bg-blue-700"} rounded-lg text-white`}>

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
