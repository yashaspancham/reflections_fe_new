import { toasting } from "@/utils/toast";
import axios from "axios";
import { api } from "../setUp/setup";
const apiBase = `${process.env.NEXT_PUBLIC_API_BASE}tasks/`;


export const getTasks = async (pageNumber: number, sort: string, search: string, statusFilter:string) => {
    try {
        const response = await api.get(`${apiBase}get_tasks/`,
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
    await api.post(`${apiBase}add_task/`, taskData);
    toasting("Task added successfully", "success");
    toasting("Reload to see the change", "info");
    return true;
  } catch (error: any) {
    console.error("Error adding task:", error);
    toasting("Error adding task", "error");
    return false;
  }
};

export const updateTask = async (taskId: number, taskData: any) => {
  try {
    const response = await api.put(`${apiBase}update_task/${taskId}/`, taskData);
    toasting("Task updated successfully", "success");
    return response.data;
  } catch (error: any) {
    console.error("Error updating task:", error);
    toasting("Error updating task", "error");
    return null;
  }
};


export const deleteTask = async (id: number,task:string) => {
  if(task!=="delete task"){
    toasting("Please enter the correct confirmation string", "error");
    return;
  }
  try {
    await api.delete(`${apiBase}delete_task/${id}/`);
    toasting("Task deleted successfully", "success");
    return true;
  } catch (error: any) {
    console.error("Error deleting task:", error);
    toasting("Error deleting task", "error");
    return false;
  }
};