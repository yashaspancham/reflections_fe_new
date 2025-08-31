"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
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
import EntrySideBar from "@/components/entryComponents/selectAnImage";
import { generateDiff } from "@/utils/savingContent/savingEntry";
import { updateEntry, savingEntry, getEntryById } from "@/APIs/Entry/entry";
import TasksSideMenu from "@/components/taskSideMenu";
import ConfirmDeletePopUp from "@/components/entryComponents/ConfirmDeletePopUp";
import { useRouter } from "next/navigation";

export default function EntryPage() {
  const [_, setEditorState] = useState({});

  const [oldHTML, setOldHTML] = useState("");
  const [sideBarBool, setSideBarBool] = useState(false);
  const [disableSaveButtom, setDisableSaveButtom] = useState<boolean>(false);
  const [sideMenuBool, setSideMenuBool] = useState(false);
  const [entryID, setEntryID] = useState<Number | null>(null);
  const [confirmDeletePopUp,setConfirmDeletePopUp]=useState(false);
  const searchParams = useSearchParams();
  const router=useRouter();
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
    onCreate: () => {
      const entryIdStr = searchParams.get("entry_id");
      if (entryIdStr !== null) {
        const entry_id = parseInt(entryIdStr);
        getEntryById(entry_id).then((res: any) => {
          if (res && editor) {
            setOldHTML(res.entryContent);
            editor.commands.setContent(res.entryContent);
          }
        });
        setEntryID(entry_id);
      }
    },
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
      setDisableSaveButtom(false);
      return;
    }

    if (oldHTML === "") {
      savingEntry(newHTML).then((res) => {
        if (res.success) {
          setOldHTML(newHTML);
          setEntryID(res.entry_id);
          router.replace(`?entry_id=${res.entry_id}`);
        }
        setDisableSaveButtom(false);
      });
    } else if (oldHTML === newHTML) {
      toasting("nothing to save", "error");
      setDisableSaveButtom(false);
    } else {
      const diff = generateDiff(oldHTML, newHTML);
      updateEntry(diff, entryID).then((res) => {
        if (res) {
          setOldHTML(newHTML);
        }
        setDisableSaveButtom(false);
      });
    }
  };

  const handleConfirmDeletePopUp=()=>{
    setConfirmDeletePopUp(true);
    document.body.style.overflow="hidden"
  }
  return (
    <div className="sm:p-10 p-5">
      <EntryTopBar
        editor={editor}
        disableSaveButtom={disableSaveButtom}
        setDisableSaveButtom={setDisableSaveButtom}
        handleSaveContentEntry={handleSaveContentEntry}
        setSideBarBool={setSideBarBool}
        sideMenuBool={sideMenuBool}
        setSideMenuBool={setSideMenuBool}
        handleConfirmDeletePopUp={handleConfirmDeletePopUp}
      />
      <EditorContent
        editor={editor}
        className="ProseMirror min-h-[300px] sm:pt-30 pt-[200px]"
      />
      <EntrySideBar
        editor={editor}
        sideBarBool={sideBarBool}
        setSideBarBool={setSideBarBool}
      />
      <TasksSideMenu
        sideMenuBool={sideMenuBool}
        setSideMenuBool={setSideMenuBool}
      />
      <ConfirmDeletePopUp
      confirmDeletePopUp={confirmDeletePopUp} 
      setConfirmDeletePopUp={setConfirmDeletePopUp}
      entryID={entryID}
      />
    </div>
  );
}
