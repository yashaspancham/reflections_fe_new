"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const SideBarMenu = () => {
  const pathname = usePathname();
  const router = useRouter();

  const pages = [
    {
      logoSrc: "/icons/entryIcon.png",
      path: "/entries",
      pageName: "Entries",
      altText: "Entries Icon",
    },
    {
      logoSrc: "/icons/mediaIcon.png",
      path: "/media",
      pageName: "Media",
      altText: "Media Icon",
    },
    {
      logoSrc: "/icons/tasksIcon.png",
      path: "/tasks",
      pageName: "Tasks",
      altText: "Tasks Icon",
    },
    {
      logoSrc: "/icons/calendarIcon.png",
      path: "/calender",
      pageName: "Calender",
      altText: "Calender Icon",
    },
  ];

  const handleRoutes = (currentPath: string, newPath: string) => {
    if (currentPath !== newPath) {
      router.push(newPath);
    }
  };

  return (
    <div className="flex max-lg:flex-wrap max-lg:gap-2 lg:flex-col lg:justify-between fixed lg:sticky z-10 left-0 bottom-0 lg:top-0 bg-blue-800 min-h-20 min-w-full lg:min-w-[200px] lg:h-[100vh]">
      
      {/* Main menu group */}
      <div className="flex lg:pt-20 lg:flex-col max-lg:flex-wrap max-lg:gap-1 sm:gap-5 lg:gap-0 items-center max-lg:justify-center flex-1">
        {pages.map((page, index) => (
          <button
            onClick={() => handleRoutes(pathname, page.path)}
            key={index}
            className={`flex items-center justify-between xl:px-5 gap-5 lg:w-full hover:cursor-pointer max-lg:mt-2 max-lg:p-3 lg:py-5 rounded-md text-md sm:text-lg lg:text-2xl text-white max-lg:bg-blue-900 hover:bg-blue-700 ${
              pathname === page.path ? "bg-blue-700" : ""
            }`}
          >
            <Image
              src={page.logoSrc}
              alt={page.altText}
              width={40}
              height={40}
              className="max-md:hidden"
            />
            <div>{page.pageName}</div>
          </button>
        ))}
      </div>

      {/* Profile group */}
      <div className="flex max-lg:justify-center lg:w-full">
        <button
          onClick={() => handleRoutes(pathname, "/profile")}
          className={`flex items-center justify-center gap-5 lg:w-full hover:cursor-pointer max-lg:mt-2 max-lg:p-3 lg:py-5 rounded-md text-md sm:text-lg lg:text-2xl text-white max-lg:bg-blue-900 hover:bg-blue-700 ${
            pathname === "/profile" ? "bg-blue-700" : ""
          }`}
        >
          <Image
            src="/icons/profileIcon.png"
            alt="Profile Icon"
            width={40}
            height={40}
            className="max-md:hidden"
          />
          <div>Profile</div>
        </button>
      </div>

    </div>
  );
};

export default SideBarMenu;
