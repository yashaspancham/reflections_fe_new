"use client";

import React, { useEffect, useState } from "react";
import SideBarMenu from "@/components/SideBarMenu";
import AddTaskButton from "@/components/addTaskButton";
import TaskComponent from "@/components/taskComponent";
import { useSearchParams } from "next/navigation";
import TasksSideMenu from "@/components/taskSideMenu";
import TaskPagesButton from "@/components/TaskPagesnav";
import { getTasks } from "@/APIs/Task/task";
import TaskSortButtons from "@/components/taskSortButtons";
import LoadingTasks from "@/components/LoadingTasks";

const TasksPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [sideMenuBool, setSideMenuBool] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [statusFilter,setStatusFilter]=useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    onLoadFunction();
  }, []);

  const onLoadFunction = async () => {
    let pagenumebr;
    const pagenumebrStr = searchParams.get("page");
    if (pagenumebrStr === null) {
      pagenumebr = 1;
    } else {
      pagenumebr = Number(pagenumebrStr);
    }
    const sortOnLoad = searchParams.get("sort") || "-lastUpdated";
    const search=searchParams.get("search")||"";
    const status = searchParams.get("status") || "";
    getTasks(pagenumebr, sortOnLoad, search, status).then((res) => {
      if (res.success) {
        setTasks(res.tasks);
        setTaskDetails(res);
      }
      setStatusFilter(status);
      setLoading(false);
    });
    setLoaded(true);
  };

  return (
    loaded && (
      <div className="w-full h-full z-0 flex">
        <SideBarMenu />
        <AddTaskButton
          sideMenuBool={sideMenuBool}
          setSideMenuBool={setSideMenuBool}
        />
        <div className="flex flex-col w-full">
          <TaskSortButtons
            searchString={searchString}
            setSearchString={setSearchString}
            setLoading={setLoading}
            setTasks={setTasks}
            setTaskDetails={setTaskDetails}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          {loading ? (
            <LoadingTasks />
          ) : (
            <div className="flex-1 w-full lg:p-16 md:p-12 sm:p-8 p-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center gap-5">
              {tasks && (tasks.map((item, index) => (
                <TaskComponent item={item} key={index} />
              )))} 
            </div>
          )}

          <div className="w-full flex justify-center max-lg:mb-[200px]">
            <TaskPagesButton taskDetails={taskDetails} />
          </div>
        </div>

        <TasksSideMenu
          sideMenuBool={sideMenuBool}
          setSideMenuBool={setSideMenuBool}
        />
      </div>
    )
  );
};

export default TasksPage;
