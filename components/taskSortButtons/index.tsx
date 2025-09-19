"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { getTasks } from "@/APIs/Task/task";
import SearchEntries from "../SearchEntries";
import TaskFilter from "../TasksFilter";

const TaskSortButtons = ({
  setTasks,
  setTaskDetails,
  setLoading,
  searchString,
  setSearchString,
  statusFilter,
  setStatusFilter,
}: any) => {
  const [sort, setSort] = React.useState("lastUpdated");
  const [loaded, setLoaded] = React.useState(false);
  const [disableSort, setDisableSort] = React.useState(false);
  const searchParams = useSearchParams();
  React.useEffect(() => {
    setLoaded(true);
    setSort(searchParams.get("sort") || "-lastUpdated");
  }, []);

  const handleSort = (field: "lastUpdated" | "createdAt" | "dueDate") => {
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
    setLoading(true);
    const pageStr = searchParams.get("page");
    const pageNumber = pageStr ? Number(pageStr) : 1;
    console.log("currentSort: ", currentSort);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    getTasks(pageNumber, currentSort, search, status).then((res) => {
      setTasks(res.tasks);
      setTaskDetails(res);
      setSort(currentSort);
      setDisableSort(false);
      setLoading(false);
    });
  };

  const handleSearchChange = (e: any) => {
    if (e.key === "Enter") {
      const pageStr = searchParams.get("page");
      const pageNumber = pageStr ? Number(pageStr) : 1;
      const status = searchParams.get("status") || "";
      setLoading(true);
      getTasks(pageNumber, sort, e.target.value, status).then((res) => {
        if (res.success) {
          setTasks(res.tasks);
          setTaskDetails(res);
        }
        setDisableSort(false);
        setLoading(false);
      });
    }
  };

  const handleStatusFilter = (status: string) => {
    const pageStr = searchParams.get("page");
    const pageNumber = pageStr ? Number(pageStr) : 1;
    const search = searchParams.get("search") || "";
    setLoading(true);
    getTasks(pageNumber, sort, search, status).then((res) => {
      if (res.success) {
        setTasks(res.tasks);
        setTaskDetails(res);
      }
      setDisableSort(false);
      setLoading(false);
    });
    setStatusFilter(status);
  };
  return (
    loaded && (
      <div className="w-full flex max-md:flex-col gap-2 justify-end items-center py-4 px-20">
        <SearchEntries
          searchString={searchString}
          setSearchString={setSearchString}
          handleSearchChange={handleSearchChange}
          focusBorderCss={"focus:ring-purple-500"}
          placeholderString={"🔍 Search Tasks"}
        />
        <TaskFilter
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          handleStatusFilter={handleStatusFilter}
        />
        <div className="flex">
          <button
            disabled={disableSort}
            onClick={() => handleSort("dueDate")}
            className={`flex justify-center items-center gap-1 text-xs md:text-sm 
            p-2 rounded-lg hover:cursor-pointer
      ${
        sort === "dueDate" || sort === "-dueDate"
          ? "bg-purple-800 hover:bg-purple-700 text-white"
          : " hover:bg-purple-100"
      } 
        `}
          >
            dueDate
            {(sort === "dueDate" || sort === "-dueDate") && (
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
            className={`flex justify-center items-center gap-1 text-xs md:text-sm 
            p-2 rounded-lg hover:cursor-pointer
        ${
          sort === "createdAt" || sort === "-createdAt"
            ? "bg-purple-800 hover:bg-purple-700 text-white"
            : " hover:bg-purple-100"
        }
        `}
          >
            createdAt
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
          <button
            disabled={disableSort}
            onClick={() => handleSort("lastUpdated")}
            className={`flex justify-center items-center gap-1 text-xs md:text-sm  
            p-2 rounded-lg hover:cursor-pointer
        ${
          sort === "lastUpdated" || sort === "-lastUpdated"
            ? "bg-purple-800 hover:bg-purple-700 text-white"
            : " hover:bg-purple-100"
        }
        `}
          >
            lastUpdated
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
        </div>
      </div>
    )
  );
};

export default TaskSortButtons;
