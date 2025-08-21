"use client";

import { useRouter } from "next/navigation";
import BulletLogo from "@/components/entryComponents/BulletLogo";
import NumberedListLogo from "@/components/entryComponents/NumberedListLogo";



const EntryTopBar = ({
    editor,
    disableSaveButtom,
    setDisableSaveButtom,
    handleSaveContentEntry,
    setSideBarBool,
    sideMenuBool,
    setSideMenuBool
}: any) => {
    const router = useRouter();
    return <div className="fixed z-10 flex flex-wrap gap-3 justify-between mb-4 mx-5 bg-white rounded-lg">
        <button
            className="p-2 bg-blue-800 hover:bg-blue-700 rounded-lg text-white hover:cursor-pointer"
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
        <button
            className="hover:bg-gray-100 rounded-sm p-2"
            onClick={() => { setSideBarBool(true) }}
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
            className={`p-2 ${sideMenuBool ? "bg-gray-300" : "bg-purple-800 hover:bg-purple-700"} rounded-lg text-white hover:cursor-pointer`}
            onClick={() => setSideMenuBool(true)}
        >
            Add Task
        </button>
        <button
            disabled={disableSaveButtom}
            onClick={() => { setDisableSaveButtom(true); handleSaveContentEntry() }}
            className={`p-2 ${disableSaveButtom ? "bg-gray-300" : "bg-blue-800 hover:bg-blue-700"} rounded-lg text-white hover:cursor-pointer`}>
            Save
        </button>
    </div>
}

export default EntryTopBar;