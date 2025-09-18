import { toasting } from "@/utils/toast";
import axios from "axios";
const apiBase=`${process.env.NEXT_PUBLIC_API_BASE}tasks/`;
export const getTasks=async ()=>{
    try{
        const response=await axios.get(`${apiBase}get_tasks/`);
        // console.log("getTasks-response: ",response.data.tasks);
        return response.data.tasks;
    }
    catch(error:any){
        console.log("Error loading tasks",error);
        toasting("Error loading tasks","error");
        return [];
    }
}