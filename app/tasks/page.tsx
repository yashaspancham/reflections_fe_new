"use client"

import React, { useEffect, useState } from "react";
import SideBarMenu from "@/components/SideBarMenu";
import AddTaskButton from "@/components/addTaskButton";
import { tasksList } from "@/temp/tempData";
import TaskComponent from "@/components/taskComponent";
import { toasting } from "@/utils/toast";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const TasksPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [sideMenuBool, setSideMenuBool] = useState(false);
    const [task, setTask] = useState("")
    const [finishDate, setFinishDate] = useState(new Date());
    const handleTaskWriting = (task: string) => {
        if (task.length <= 200) {
            setTask(task);
            return;
        }
        toasting("Max 200 characters", "error")
    }
    useEffect(() => { setLoaded(true) }, [])
    return (loaded && <div className="w-full h-full z-0 lg:flex">
        <SideBarMenu />
        <AddTaskButton sideMenuBool={sideMenuBool} setSideMenuBool={setSideMenuBool} />
        <div className="w-full lg:p-16 md:p-12 sm:p-8 p-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center gap-5">
            {tasksList.map((item, index) => (
                <TaskComponent item={item} key={index} />
            ))}
        </div>
        {sideMenuBool && <div className="fixed z-10 bg-white border-l-2 border-purple-900 p-20 h-full right-0 top-0">
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
                        onChange={(date) => { if (date !== null) setFinishDate(date) }}
                        dateFormat="dd-MM-yyyy"
                        placeholderText="Pick a date"
                        className="placeholder-purple-400 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"

                    />
                </div>
                <div className="bottom-20 fixed text-white flex gap-5">
                    <button
                        onClick={() => { setSideMenuBool(false) }}
                        className="hover:cursor-pointer hover:bg-red-700 bg-red-600 p-3 rounded-lg">Cancle</button>
                    <button className="hover:cursor-pointer hover:bg-purple-700 bg-purple-600 p-3 rounded-lg">Add</button>
                </div>
            </div>
        </div>}
    </div>)
}

export default TasksPage;
