"use client";

import React, { useEffect, useState } from "react";
import SideBarMenu from "@/components/SideBarMenu";
import AddTaskButton from "@/components/addTaskButton";
import TaskComponent from "@/components/taskComponent";
import { useSearchParams } from "next/navigation";
import TasksSideMenu from "@/components/taskSideMenu";
import TaskPagesButton from "@/components/TaskPagesnav";
import { deleteTask, getTasks } from "@/APIs/Task/task";
import TaskSortButtons from "@/components/taskSortButtons";
import LoadingTasks from "@/components/LoadingTasks";
import ConfirmDeletePopUp from "@/components/entryComponents/ConfirmDeletePopUp";
import { useRouter } from "next/navigation";
import { toasting } from "@/utils/toast";

const TasksPage = () => {
  const [loaded, setLoaded] = useState(false);
  const [sideMenuBool, setSideMenuBool] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [confirmDeletePopUp, setConfirmDeletePopUp] = useState(false);
  const [entryID, setEntryID] = useState<Number | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
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
    const search = searchParams.get("search") || "";
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
  const handleDeleteEntry = (entryID: number, text: string) => {
    deleteTask(entryID, text).then((res) => {
      if (res) {
        toasting("reload page to see the changes","info");
        setConfirmDeletePopUp(false);
      }
    });
  };
  const handleConfirmDeletePopUp = () => {
    setConfirmDeletePopUp(true);
    document.body.style.overflow = "hidden";
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
              {tasks &&
                tasks.map((item, index) => (
                  <TaskComponent
                    item={item}
                    key={index}
                    setSelectedTask={setSelectedTask}
                    setEntryID={setEntryID}
                    handleConfirmDeletePopUp={handleConfirmDeletePopUp}
                  />
                ))}
            </div>
          )}

          <div className="w-full flex justify-center max-lg:mb-[200px]">
            <TaskPagesButton taskDetails={taskDetails} />
          </div>
        </div>

        <TasksSideMenu
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
          sideMenuBool={sideMenuBool}
          setSideMenuBool={setSideMenuBool}
        />

        <ConfirmDeletePopUp
          confirmDeletePopUp={confirmDeletePopUp}
          setConfirmDeletePopUp={setConfirmDeletePopUp}
          handleDeleteEntry={handleDeleteEntry}
          delete_type={"task"}
          entryID={entryID}
        />
      </div>
    )
  );
};

export default TasksPage;
