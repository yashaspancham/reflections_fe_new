"use state";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAllEntries } from "@/APIs/Entry/entry";
import {
  readSortEntriesInLocalStore,
  writeSortEntriesInLocalStore,
} from "@/utils/localStore";
import SearchEntries from "../SearchEntries";


const SortEntriesOptions = ({ setEntries, setEntriesDetails }: any) => {
  const [sort, setSort] = useState("-lastUpdated");
  const [disableSort, setDisableSort] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    readSortEntriesInLocalStore().then((res) => {
      setSort(res);
      setLoaded(true);
    });
  }, []);
  const handleSort = (field: "lastUpdated" | "createdAt") => {
    let currentSort = "";
    //with "-" >> descending(newest first) >> "˅" in UI
    //no "-" >> ascending(oldest first) >> "^" in UI
    if (sort !== field && sort !== `-${field}`) {
      currentSort = `-${field}`; // default to descending
    } else if (sort === field) {
      currentSort = `-${field}`; // toggle to descending
    } else if (sort === `-${field}`) {
      currentSort = field; // toggle to ascending
    }

    setDisableSort(true);

    const pageStr = searchParams.get("page");
    const pageNumber = pageStr ? Number(pageStr) : 1;

    getAllEntries(pageNumber, currentSort).then((res) => {
      if (res.entries) {
        setEntries(res.entries);
      }
      setEntriesDetails(res);
      setSort(currentSort);
      writeSortEntriesInLocalStore(currentSort);
      setDisableSort(false);
    });
  };
  return (
    loaded && (
      <div className="absolute z-10 right-40 top-20 flex gap-3 items-center justify-center">
        <SearchEntries/>
        <button
          disabled={disableSort}
          onClick={() => handleSort("lastUpdated")}
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
              className={sort[0] === "-" ? `` : "scale-y-[-1]"}
            />
          )}
        </button>
        <button
          disabled={disableSort}
          onClick={() => handleSort("createdAt")}
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
              className={sort[0] === "-" ? `` : "scale-y-[-1]"}
            />
          )}
        </button>
      </div>
    )
  );
};
export default SortEntriesOptions;