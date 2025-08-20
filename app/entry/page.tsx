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
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import { TextStyle, Color } from "@tiptap/extension-text-style";
import { toasting } from "@/utils/toast";
import { useSaveShortcut } from "@/customHooks/saveShortcut";
import EntryTopBar from "@/components/entryComponents/entryTopBar";
import { savingEntry } from "@/utils/savingContent/savingEntry";
import EntrySideBar from "@/components/entryComponents/selectAnImage";
import { generateDiff } from "@/utils/savingContent/savingEntry"
import { updateEntry } from "@/utils/savingContent/savingEntry";

export default function EntryPage() {
  const [_, setEditorState] = useState({});

  const [oldHTML, setOldHTML] = useState("");
  const [sideBarBool, setSideBarBool] = useState(false);
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
    content: oldHTML,
    immediatelyRender: false,
    onUpdate: () => setEditorState({}),
    onSelectionUpdate: () => setEditorState({}),
  });

  useSaveShortcut(() => {
    if (!editor || disableSaveButtom) return;
    setDisableSaveButtom(true);
    handleSaveContentEntry();
  });
  if (!editor) return null;


  const handleSaveContentEntry = () => {
    const newHTML = editor.getHTML();
    const textOnly = newHTML
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, "")
      .replace(/\s+/g, "")
      .trim();
    if (!textOnly) {
      toasting("Nothing to save", "error");
      setDisableSaveButtom(false)
      return;
    }

    if (oldHTML === "") {
      savingEntry(newHTML).then((res) => { if (res) { setOldHTML(newHTML); } setDisableSaveButtom(false) });
    }
    else {
      const diff = generateDiff(oldHTML, newHTML);
      console.log("diff: ", diff);
      updateEntry(diff).then(res => { if (res) { setOldHTML(newHTML) }; setDisableSaveButtom(false) })
    }
  };


  return (
    <div className="sm:p-10 p-5">
      <EntryTopBar
        editor={editor}
        disableSaveButtom={disableSaveButtom}
        setDisableSaveButtom={setDisableSaveButtom}
        handleSaveContentEntry={handleSaveContentEntry}
        setSideBarBool={setSideBarBool}
      />

      <EditorContent
        editor={editor}
        className="ProseMirror min-h-[300px] sm:pt-24 pt-[200px]"
      />
      <EntrySideBar
        editor={editor}
        sideBarBool={sideBarBool}
        setSideBarBool={setSideBarBool}
      />
    </div>
  );
}