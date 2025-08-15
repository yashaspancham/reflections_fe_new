"use client"

import React from "react";
import SideBarMenu from "@/components/SideBarMenu";
import AddTaskButton from "@/components/addTaskButton";

const TasksPage=()=>{
    return <div className="w-full h-full z-0 lg:flex">
        <SideBarMenu/>
        <AddTaskButton/>
    </div>
}

export default TasksPage;
