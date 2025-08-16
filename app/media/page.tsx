"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SideBarMenu from "@/components/SideBarMenu";
import AddMediaButton from "@/components/addMediaButton";
import { getAllImages } from "@/APIs/S3/getAllImages";
import { toasting } from "@/utils/toast";


const MediaPage = () => {
    const [urlList, setUrlList] = useState<any[]>([]);
    useEffect(() => {
        getAllImages().then(res => { console.log("res: ", res.files); setUrlList(res.files) })
    }, []);
    const handleCopyImageURL = (url: string) => {
        navigator.clipboard.writeText(url)
        toasting("Image URL copied", "success")
    }
    const handleDownloadImage = async (url: string) => {
        try {
            const response = await fetch(url, { mode: "cors" });
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = url.split("/").pop() || "image";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("error: ",error)
            toasting("Failed to download image", "error");
        }
    }
    return <div className="z-0 lg:flex">
        <SideBarMenu />
        <AddMediaButton />
        <div className="lg:p-16 md:p-10 sm:p-6 p-3 flex flex-wrap gap-10 h-fit">
            {urlList.map((item, index) => (
                <div
                    key={index}
                    className="max-h-46 flex items-center justify-center relative max-h-40"
                >
                    <img
                        src={item.url}
                        alt="uploaded image"
                        className="max-h-46 w-full h-full object-contain z-0 rounded-lg"
                    />
                    <div className="rounded-lg h-full w-full absolute top-0 left-0 z-10 flex items-end justify-end transition hover:opacity-100 opacity-0">
                        <div className="flex m-1 md:m-3 bg-gray-200">
                            <button onClick={() => handleCopyImageURL(item.url)} className="hover:cursor-pointer p-1"><Image src={"/icons/copyURLLogo.png"} alt="Copy icons" width={20} height={20} /></button>
                            {/* <button onClick={() => { handleDownloadImage(item.url) }} className="hover:cursor-pointer p-1"><Image src={"/icons/downloadIcon.png"} alt="download icons" width={20} height={20} /></button> */}
                            <button onClick={() => { }} className="hover:cursor-pointer p-1"><Image src={"/icons/deleteIcon.png"} alt="delete icons" width={20} height={20} /></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default MediaPage;
