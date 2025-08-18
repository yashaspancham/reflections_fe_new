"use client";

import { useState, useEffect } from "react";
import { getAllImages } from "@/APIs/S3/s3";
import { useRef } from "react";
import { uploadToS3 } from "@/APIs/S3/s3";
import { iSImage } from "@/utils/images";
const EntrySideBar = ({
    editor,
    sideBarBool,
    setSideBarBool
}: any) => {
    const [urlList, setUrlList] = useState<any[]>([]);
    const [disableAddButton, setDisableAddButton] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getAllImages().then((res) => {
            console.log("res: ", res.files);
            setUrlList(res.files);
        });
    }, [])

    const handleAddClick = () => {
        setDisableAddButton(true);
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const result = await uploadToS3(file);
        if (result) {
            setUrlList((prev: any) => [...prev, result]);
        }
        event.target.value = "";
        setDisableAddButton(false);
    };


    const handleAddImage = (url: string) => {
        editor?.chain().focus().setImage({ src: url }).run()
        setSideBarBool(false);
    };

    return (
        sideBarBool && <div className="flex flex-col jutify-center p-5 sm:p-10 md:p-12 lg:p-16 h-full z-11 fixed right-0 top-0 bg-indigo-900">
            <p className="text-white text-2xl bg-indigo-800 w-fit p-2">Media</p>
            <div className="bg-white h-[80vh] p-5 flex gap-5 flex-wrap w-full sm:w-[400px]  overflow-y-auto">
                {[...urlList].reverse().map((item, index) => (
                    <button
                        onClick={() => handleAddImage(item.url)}
                        key={index}
                        className="max-h-46 flexitems-center justify-center relative max-h-30 hover:cursor-pointer"
                    >
                        <img
                            src={item.url}
                            alt="uploaded image"
                            className="max-h-30 w-full h-full object-contain z-0 rounded-lg"
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                    </button>
                ))}
            </div>
            <div className="translate-y-[-55px] translate-x-[10px] flex gap-7">
                <button
                    onClick={() => setSideBarBool(false)}
                    className="bg-red-700 hover:bg-red-800 hover:cursor-pointer text-white w-fit p-3 rounded-lg">
                    Cancel
                </button>
                <button
                    disabled={disableAddButton}
                    onClick={handleAddClick}
                    className={`
                        ${disableAddButton ? "bg-gray-500" : "bg-indigo-700 hover:bg-indigo-800 hover:cursor-pointer"}
                        text-white w-fit p-3 rounded-lg`}
                >
                    Add
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </button>
            </div>
        </div>
    )
}

export default EntrySideBar;