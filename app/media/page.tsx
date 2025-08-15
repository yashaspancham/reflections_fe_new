"use client";
import React, { useEffect, useState } from "react";
import SideBarMenu from "@/components/SideBarMenu";
import AddMediaButton from "@/components/addMediaButton";
import { getAllImages } from "@/APIs/S3/getAllImages";


const MediaPage = () => {
    const [urlList,setUrlList]=useState<any[]>([]);
    useEffect(() => {
        getAllImages().then()
    }, []);
    return <div className="w-full h-full z-0 lg:flex">
        <SideBarMenu />
        <AddMediaButton />
        <div className="lg:p-16 md:p-10 sm:p-6 p-3">
        </div>
    </div>
}

export default MediaPage;
