"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteEntry } from "@/APIs/Entry/entry";

const ConfirmDeletePopUp = ({
  confirmDeletePopUp,
  setConfirmDeletePopUp,
  entryID,
}: any) => {
  const [text, setText] = useState("");
  const router=useRouter();

  const handleCancel = () => {
    setConfirmDeletePopUp(false);
    document.body.style.overflow = "";
  };

  const handleDeleteEntry = () => {
    deleteEntry(entryID,text).then((res) => {
      if (res) {
        router.push("/entries");
      }
    });
  };

  useEffect(() => {
    if (confirmDeletePopUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [confirmDeletePopUp]);

  if (!confirmDeletePopUp) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] text-md"
      onClick={handleCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-5 h-[200px] w-[300px] bg-gray-200 rounded-lg flex flex-col gap-3"
      >
        <p>This is a permanent action. Confirm by typing "delete entry"</p>

        <input
          className="bg-white p-1 border rounded"
          placeholder="Confirm delete..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-5 flex gap-2 flex-row-reverse">
          <button
            className="p-2 rounded-lg text-white bg-red-700 hover:cursor-pointer hover:bg-red-800"
            onClick={()=>handleDeleteEntry()}
          >
            Delete
          </button>
          <button
            className="p-2 rounded-lg text-white bg-blue-700 hover:cursor-pointer hover:bg-blue-800"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopUp;
