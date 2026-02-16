"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BulletLogo from "@/components/entryComponents/BulletLogo";
import NumberedListLogo from "@/components/entryComponents/NumberedListLogo";
import { CiImageOn } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { IoMdColorFilter } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";


const EntryTopBar = ({
  editor,
  disableSaveButtom,
  setDisableSaveButtom,
  handleSaveContentEntry,
  setSideBarBool,
  sideMenuBool,
  setSideMenuBool,
  handleConfirmDeletePopUp,
}: any) => {
  const router = useRouter();
  // local state to force re-render when editor state changes
  const [, setEditorTick] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const handle = () => {
      setEditorTick((t) => t + 1);
    };

    editor.on("update", handle);
    editor.on("selectionUpdate", handle);
    editor.on("transaction", handle);

    return () => {
      editor.off("update", handle);
      editor.off("selectionUpdate", handle);
      editor.off("transaction", handle);
    };
  }, [editor]);
  return (
    <div className=" shadow-md p-2.5 fixed z-10 flex flex-wrap gap-3 items-center justify-between mb-4 mx-5 bg-white rounded-lg">
      <button
        className="p-2 bg-blue-800 hover:bg-blue-700 rounded-[50%] text-white hover:cursor-pointer flex gap-2 items-center"
        onClick={() => router.push("/entries")}
      >
        <IoArrowBack />
      </button>
      <p className="text-gray-200 text-2xl">|</p>
      <button
        className={`${
          editor.isActive("bold") ? "bg-gray-200" : ""
        } font-bold rounded-sm p-2 hover:cursor-pointer hover:bg-gray-100`}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </button>
      <button
        className={`${
          editor.isActive("italic") ? "bg-gray-200" : ""
        } italic rounded-sm p-2 hover:cursor-pointer hover:bg-gray-100`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        I
      </button>
      <button
        className={`${
          editor.isActive("underline") ? "bg-gray-200" : ""
        } underline rounded-sm p-2 hover:cursor-pointer hover:bg-gray-100`}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        U
      </button>
      <p className="text-gray-200 text-2xl">|</p>
      <button
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className={`${
          editor?.isActive("bulletList") ? "bg-gray-200" : ""
        }  p-2 rounded-sm hover:cursor-pointer hover:bg-gray-100`}
      >
        <BulletLogo />
      </button>
      <button
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        className={`${
          editor?.isActive("orderedList") ? "bg-gray-200" : ""
        }  p-2 rounded-sm hover:cursor-pointer hover:bg-gray-100`}
      >
        <NumberedListLogo />
      </button>
      <p className="text-gray-200 text-2xl">|</p>
      <button
        className="hover:bg-gray-100 rounded-sm p-2 hover:cursor-pointer flex gap-2 items-center"
        onClick={() => {
          setSideBarBool(true);
        }}
      >
        <CiImageOn />
        Image
      </button>
      <p className="text-gray-200 text-2xl">|</p>
      <select
        className="hover:cursor-pointer"
        onChange={(e) => {
          editor.chain().focus().setFontFamily(e.target.value).run();
        }}
        defaultValue=""
      >
        <option
          value={editor.getAttributes("textStyle").fontFamily || ""}
          disabled
        >
          Default
        </option>
        <option value="">Default</option>
        <option value="arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Inter">Inter</option>
        <option value="Merriweather">Merriweather</option>
        <option value="Roboto Mono">Roboto Mono</option>
      </select>
      <select
        className="rounded p-1 hover:cursor-pointer"
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
      <p className="text-gray-200 text-2xl">|</p>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <span className="font-bold text-lg hover:bg-gray-100">
          <IoMdColorFilter
            color={editor.getAttributes("textStyle").color || "#000"}
          />
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
      <p className="text-gray-200 text-2xl">|</p>
      <button
        disabled={disableSaveButtom}
        onClick={() => {
          setDisableSaveButtom(true);
          handleSaveContentEntry();
        }}
        className={`p-2 ${
          disableSaveButtom ? "bg-gray-300" : "bg-green-700 hover:bg-green-600"
        } rounded-lg text-white hover:cursor-pointer flex gap-2 items-center`}
      ><FaRegSave/>
        Save
      </button>

      <button
        className={`p-2 ${
          sideMenuBool ? "bg-gray-300" : "bg-yellow-600 hover:bg-yellow-500"
        } rounded-lg text-white hover:cursor-pointer flex gap-2 items-center`}
        onClick={() => setSideMenuBool(true)}
      ><IoMdAdd/>
        Add Task
      </button>
      <button
        onClick={handleConfirmDeletePopUp}
        className="hover:cursor-pointer hover:bg-gray-100 p-1 rounded-sm"
      >
        <RiDeleteBinLine color={"red"} size={25} />
      </button>
    </div>
  );
};

export default EntryTopBar;


