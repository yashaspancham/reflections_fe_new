import { toasting } from "@/utils/toast";
import axios from "axios";
const apiBase = `${process.env.NEXT_PUBLIC_API_BASE}tasks/`;


export const getTasks = async (pageNumber: number, sort: string, search: string, statusFilter:string) => {
    try {
        const response = await axios.get(`${apiBase}get_tasks/`,
            { params: { page: pageNumber, sort: sort, search: search, status:statusFilter } });
        console.log("getTasks-response: ", response.data);
        return response.data;
    }
    catch (error: any) {
        console.log("Error loading tasks", error);
        toasting("Error loading tasks", "error");
        return [];
    }
}

export const addTask = async (taskData:any) => {
  console.log("taskData: ",taskData);
  try {
    await axios.post(`${apiBase}add_task/`, taskData);
    toasting("Task added successfully", "success");
    toasting("Reload to see the change", "info");
    return true;
  } catch (error: any) {
    console.error("Error adding task:", error);
    toasting("Error adding task", "error");
    return false;
  }
};