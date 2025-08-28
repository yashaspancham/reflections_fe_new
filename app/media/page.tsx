"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SideBarMenu from "@/components/SideBarMenu";
import AddMediaButton from "@/components/addMediaButton";
import { delete_iamge, downloadImage, getAllImages } from "@/APIs/S3/s3";
import { toasting } from "@/utils/toast";

const MediaPage = () => {
  const [urlList, setUrlList] = useState<any[]>([]);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  useEffect(() => {
    getAllImages().then((res) => {
      setUrlList(res.files);
    });
  }, []);
  const handleCopyImageURL = (url: string) => {
    navigator.clipboard.writeText(url);
    toasting("Image URL copied", "success");
  };

  const handleDownloadImage = async (url: string) => {
    try {
      const blob = await downloadImage(url);
      if (blob === undefined) return;
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = url.split("/").pop()?.split("?")[0] || "image";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("error: ", error);
      toasting("Failed to download image", "error");
    }
  };
  const handleDeleteImage = async (url: string) => {
    setDeleteButtonDisabled(true);
    delete_iamge(url).then((res) => {
      if (res) {
        getAllImages().then((res) => {
          console.log("getAllImages-res: ", res.files);
          setUrlList(res.files);
        });
      }
      setDeleteButtonDisabled(false);
    });
  };
  return (
    <div className="z-0 lg:flex">
      <SideBarMenu />
      <AddMediaButton setUrlList={setUrlList} />
      <div className="lg:p-16 md:p-10 sm:p-6 p-3 flex flex-wrap gap-10 h-fit">
        {urlList.length === 0 ? (
          <p className="text-lg text-red-800">Your media will be here</p>
        ) : (
          <>
            {[...urlList].reverse().map((item, index) => (
              <div
                key={index}
                className="max-h-46 flex items-center justify-center relative max-h-40"
              >
                <img
                  src={item.url}
                  alt="uploaded image"
                  className="max-h-46 w-full h-full object-contain z-0 rounded-lg"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="rounded-lg h-full w-full absolute top-0 left-0 z-1 flex items-end justify-end transition hover:opacity-100 lg:opacity-0">
                  <div className="flex m-1 md:m-3 bg-gray-200 rounded-sm">
                    <p className="w-20 truncate">
                      {item.url.split("/").pop().split("?")[0]}
                    </p>
                    <button
                      onClick={() => handleCopyImageURL(item.url)}
                      className="hover:cursor-pointer p-1"
                    >
                      <Image
                        src={"/icons/copyURLLogo.png"}
                        alt="Copy icons"
                        width={20}
                        height={20}
                      />
                    </button>
                    <button
                      onClick={() => {
                        handleDownloadImage(item.url);
                      }}
                      className="hover:cursor-pointer p-1"
                    >
                      <Image
                        src={"/icons/downloadIcon.png"}
                        alt="download icons"
                        width={20}
                        height={20}
                      />
                    </button>

                    <button
                      disabled={deleteButtonDisabled}
                      onClick={() => {
                        handleDeleteImage(item.url);
                      }}
                      className={`hover:cursor-pointer p-1 
                                        ${deleteButtonDisabled
                          ? "opacity-50"
                          : ""
                        }
                                        `}
                    >
                      <Image
                        src={"/icons/deleteIcon.png"}
                        alt="delete icons"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MediaPage;
