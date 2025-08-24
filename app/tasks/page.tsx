"use client"

import React, { useEffect, useState } from "react";
import SideBarMenu from "@/components/SideBarMenu";
import AddTaskButton from "@/components/addTaskButton";
import { tasksList } from "@/temp/tempData";
import TaskComponent from "@/components/taskComponent";
import TasksSideMenu from "@/components/taskSideMenu";


const TasksPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [sideMenuBool, setSideMenuBool] = useState(false);


    useEffect(() => { setLoaded(true) }, [])
    return (loaded && <div className="w-full h-full z-0 lg:flex">
        <SideBarMenu />
        <AddTaskButton sideMenuBool={sideMenuBool} setSideMenuBool={setSideMenuBool} />
        <div className="w-full lg:p-16 md:p-12 sm:p-8 p-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center gap-5">
            {tasksList.map((item, index) => (
                <TaskComponent item={item} key={index} />
            ))}
        </div>
        <TasksSideMenu sideMenuBool={sideMenuBool} setSideMenuBool={setSideMenuBool}/>
    </div>)
}

export default TasksPage;
