"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const SideBarMenu = () => {
  const pathname = usePathname();
  const pages = [
    {
      logoSrc: "/icons/profileIcon.png",
      path: "/profile",
      pageName: "Profile",
      altText:"Profile Icon"
    },
    { logoSrc: "/icons/entryIcon.png", path: "/", pageName: "Entries",altText:"Entries Icon" },
    { logoSrc: "/icons/mediaIcon.png", path: "/media", pageName: "Media",altText:"Media Icon" },
  ];

  return (
    <div className="fixed lg:sticky z-10 left-0 bottom-0 lg:top-0 bg-blue-800 h-20 min-w-full lg:min-w-[200px] lg:h-[100vh]">
      <div className="flex lg:pt-20 lg:flex-col max-lg:gap-10 sm:gap-5 lg:gap-0 items-center max-lg:justify-center">
        {pages.map((page, index) => (
          <button
            key={index}
            className={`flex items-center justify-center gap-5 lg:w-[100%] hover:cursor-pointer max-lg:mt-5 max-lg:p-3 lg:py-5 rounded-md text-md sm:text-lg lg:text-2xl text-white max-lg:bg-blue-900 hover:bg-blue-700 
                ${pathname === page.path ? "bg-blue-700" : ""}`}
          >
            <Image
              src={page.logoSrc}
              alt={page.altText}
              width="40"
              height="40"
              className="max-sm:hidden"
            />
            <div>{page.pageName}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideBarMenu;
