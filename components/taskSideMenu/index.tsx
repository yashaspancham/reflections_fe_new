"use client";
import { useEffect, useState } from "react";
import { toasting } from "@/utils/toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTask, updateTask } from "@/APIs/Task/task";

const TasksSideMenu = ({
  setSelectedTask,
  sideMenuBool,
  setSideMenuBool,
  selectedTask,
}: any) => {
  const [finishDate, setFinishDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 2))
  );
  const [task, setTask] = useState("");
  const [taskStatus, setTaskStatus] = useState("pending");
  const [loaded, setLoaded] = useState(false);
  const handleTaskWriting = (task: string) => {
    if (task.length <= 200) {
      setTask(task);
      return;
    }
    toasting("Max 200 characters", "error");
  };
  const handleTaskUpdate = () => {
    if (task === "") {
      toasting("No text found", "error");
      return;
    }

    const taskData = {
      description: task,
      status: taskStatus,
      dueDate: finishDate.toISOString().split("T")[0],
    };
    if (selectedTask) {
      if (
        selectedTask.description === task &&
        new Date(selectedTask.dueDate) === finishDate &&
        selectedTask.status === taskStatus
      ) {
        toasting("Nothing to update", "error");
        return;
      }
      updateTask(selectedTask.id, taskData).then((res) => {
        if (res) {
          setSideMenuBool(false);
          setSelectedTask(null);
          setTask("");
          setTaskStatus("pending");
        }
      });
    } else {
      addTask(taskData).then((res) => {
        if (res) {
          setSideMenuBool(false);
          setTask("");
          setTaskStatus("pending");
        }
      });
    }
  };
  useEffect(() => {
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (selectedTask && typeof selectedTask === "object") {
      setSideMenuBool(true);
      setTask(selectedTask.description || "");
      setTaskStatus(selectedTask.status || "pending");
      setFinishDate(
        selectedTask.dueDate
          ? new Date(selectedTask.dueDate)
          : new Date(new Date().setDate(new Date().getDate() + 2))
      );
    } else {
      setTask("");
      setTaskStatus("pending");
      setFinishDate(new Date(new Date().setDate(new Date().getDate() + 2)));
    }
  }, [selectedTask]);

  return (
    loaded &&
    sideMenuBool && (
      <div className="fixed z-10 bg-white border-l-2 border-purple-900 max-sm:w-full lg:p-16 md:p-12 p-8 h-full right-0 top-0">
        <div className="bg-white flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <p className="text-purple-900 text-center text-xl">Add task</p>
            <textarea
              value={task}
              onChange={(e) => handleTaskWriting(e.target.value)}
              placeholder="Add a new task..."
              className="placeholder-purple-400 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={6}
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-purple-900 text-center text-xl">Finish By</p>
            <DatePicker
              selected={finishDate}
              onChange={(date) => {
                if (date !== null) setFinishDate(date);
              }}
              minDate={new Date(new Date().setDate(new Date().getDate() + 2))}
              dateFormat="dd-MM-yyyy"
              placeholderText="Pick a date"
              className="placeholder-purple-400 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex gap-2 text-xs">
            <button
              onClick={() => setTaskStatus("pending")}
              className={`rounded-lg p-2 hover:cursor-pointer ${
                taskStatus === "pending"
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "hover:bg-purple-100"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setTaskStatus("in_progress")}
              className={`rounded-lg p-2 hover:cursor-pointer ${
                taskStatus === "in_progress"
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "hover:bg-purple-100"
              }`}
            >
              In-Process
            </button>
            {selectedTask !== null && (
              <button
                onClick={() => setTaskStatus("completed")}
                className={`rounded-lg p-2 hover:cursor-pointer ${
                  taskStatus === "completed"
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "hover:bg-purple-100"
                }`}
              >
                Completed
              </button>
            )}
          </div>

          <div className="bottom-20 fixed text-white flex gap-5">
            <button
              onClick={() => {
                {
                  setSelectedTask(null);
                  setSideMenuBool(false);
                }
              }}
              className="hover:cursor-pointer hover:bg-red-700 bg-red-600 p-3 rounded-lg"
            >
              Cancle
            </button>
            <button
              onClick={() => {
                handleTaskUpdate();
              }}
              className="hover:cursor-pointer hover:bg-purple-700 bg-purple-600 p-3 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default TasksSideMenu;
