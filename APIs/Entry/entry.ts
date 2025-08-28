import axios from "axios";
import { toastControl, toasting } from "@/utils/toast";

const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE

export const savingEntry = async (editorContent: string) => {
    const toastId = toastControl("loading", "Creating Entry...");
    try {
        const res = await axios.post(`${apiBaseURL}journal/createEntry/`, { content: editorContent })
        toastControl("success", "Entry created Successfull!", toastId);
        return { "success": true, "entry_id": res.data.entry_id };
    }
    catch (error: any) {
        console.error("Error creating content:", error);
        toastControl("error", "Entry creation failed!", toastId);
        return { "success": false, "entry_id": null };
    }
}


export const updateEntry = async (diff: string, entryID: Number | null) => {
    const toastId = toastControl("loading", "Saving content...");
    try {
        await axios.post(`${apiBaseURL}journal/updateEntry/`, { "content": diff, "entry_id": entryID })
        toastControl("success", "Save Successfull!", toastId);
        return true;
    }
    catch (error: any) {
        console.error("Error saving content:", error);
        toastControl("error", "Save failed!", toastId);
        return false;
    }
}


export const getAllEntries = async (page: number = 1) => {
    try {
        const response = await axios.get(`${apiBaseURL}journal/getAllEntries/`, {
            params: { page },
        });
        console.log("getAllEntries-res: ",response.data);
        return response.data;
    } catch (error: any) {
        console.log("Error loading entries", error);
        toasting("Error loading entries", "error");
        return { entries: [], total_pages: 0, current_page: 1 };
    }
};

export const getEntryById = async (entry_id: number) => {
    try {
        const response = await axios.get(`${apiBaseURL}journal/getEntryById`, {
            params: { "entry_id": entry_id }
        });
        console.log("getEntryById-res: ",response.data);
        return response.data;
    }
    catch (error: any) {
        console.log("error: ",error);
        toastControl("Error Obtaining entry","error");
        return null;
    }
} 

export const deleteEntry=async(entry_id: number,confirmationText:string)=>{
    if(confirmationText!=="delete entry"){
        toasting("Please Enter Confirmation Text","error");
        return false;
    }
    try{
        await axios.delete(`${apiBaseURL}journal/deleteEntry/`,{
            params:{entry_id:entry_id}
        });
        toasting("Successfully deleted entry","success");
        return true;
    }
    catch(error:any){
        toasting("Error deleting entry","error");
        console.log("error: ",error);
        return false;
    }
}