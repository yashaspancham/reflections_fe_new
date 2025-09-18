"use client";

import React, { useEffect, useState } from "react";
import SideBarMenu from "@/components/SideBarMenu";
import AddTaskButton from "@/components/addTaskButton";
import TaskComponent from "@/components/taskComponent";
import { useSearchParams } from "next/navigation";
import TasksSideMenu from "@/components/taskSideMenu";
import TaskPagesButton from "@/components/TaskPagesButtons";
import { getTasks } from "@/APIs/Task";

const TasksPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [sideMenuBool, setSideMenuBool] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState(null);
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
    getTasks(pagenumebr).then((res) => {
      setTasks(res.tasks);
      if (res.success) {
        setTaskDetails(res);
      }
    });
    setLoaded(true);
  };

  return (
    loaded && (
      <div className="w-full h-full z-0 lg:flex">
        <SideBarMenu />
        <AddTaskButton
          sideMenuBool={sideMenuBool}
          setSideMenuBool={setSideMenuBool}
        />
        <div className="flex flex-col w-full">
          <div className="flex-1 w-full lg:p-16 md:p-12 sm:p-8 p-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center gap-5">
            {tasks.map((item, index) => (
              <TaskComponent item={item} key={index} />
            ))}
          </div>

          <div className="w-full flex justify-center p-4">
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
