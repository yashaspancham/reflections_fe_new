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
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        console.log("Error loading entries", error);
        toasting("Error loading entries", "error");
        return [];
    }
};
