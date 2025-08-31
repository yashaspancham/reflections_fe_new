"use state";
import { useState } from "react";
import { getAllEntries } from "@/APIs/Entry/entry";

const SortEntriesOptions = ({
  setEntries,
  setEntriesDetails,
}: any) => {
  const [sort, setSort] = useState("-lastUpdated");
  const handleLastUpdated = () => {
    let currentSort = "";
    if (sort !== "lastUpdated" && sort !== "-lastUpdated") {
      currentSort = "lastUpdated";
    }
    if (sort === "lastUpdated") {
      currentSort = "-lastUpdated";
    }
    if (sort === "-lastUpdated") {
      currentSort = "lastUpdated";
    }
    getAllEntries(1, currentSort).then((res) => {
      if (res.entries) {
        console.log("getAllEntries-res: ", res.entries);
        setEntries(res.entries);
      }
      setEntriesDetails(res);
      setSort(currentSort);
    });
  };
  const handleCreatedAt = () => {
    let currentSort = "";
    if (sort !== "createdAt" && sort !== "-createdAt") {
      currentSort = "createdAt";
    }
    if (sort === "createdAt") {
      currentSort = "-createdAt";
    }
    if (sort === "-createdAt") {
      currentSort = "createdAt";
    }
    getAllEntries(1, currentSort).then((res) => {
      if (res.entries) {
        console.log("getAllEntries-res: ", res.entries);
        setEntries(res.entries);
      }
      setEntriesDetails(res);
      setSort(currentSort);
    });
  };
  return (
    <div className="absolute z-10 right-40 top-20 flex gap-3">
      <button
        onClick={() => {
          handleLastUpdated();
        }}
        className={`
            flex justify-center items-center gap-2
            text-xs md:text-sm 
            p-2 
            ${
              sort === "lastUpdated" || sort === "-lastUpdated"
                ? "bg-blue-800 hover:bg-blue-700 text-white"
                : "text-blue-800 hover:bg-blue-100"
            }
            hover:cursor-pointer
            rounded-lg
        `}
      >
        LastUpdated
        {(sort === "lastUpdated" || sort === "-lastUpdated") && (
          <img
            src="/icons/sortArrowLogo.png"
            alt="sort arrow logo"
            width={10}
            height={10}
            className={sort[0] === "-" ? ` scale-y-[-1]` : ""}
          />
        )}
      </button>
      <button
        onClick={() => handleCreatedAt()}
        className={`
            flex justify-center items-center gap-2 text-xs md:text-sm 
             ${
               sort === "createdAt" || sort === "-createdAt"
                 ? "bg-blue-800 hover:bg-blue-700 text-white"
                 : "text-blue-800 hover:bg-blue-100"
             }
            rounded-lg hover:cursor-pointer p-2
        `}
      >
        CreatedAt
        {(sort === "createdAt" || sort === "-createdAt") && (
          <img
            src="/icons/sortArrowLogo.png"
            alt="sort arrow logo"
            width={10}
            height={10}
            className={sort[0] === "-" ? ` scale-y-[-1]` : ""}
          />
        )}
      </button>
    </div>
  );
};
export default SortEntriesOptions;
