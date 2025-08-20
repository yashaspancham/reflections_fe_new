import axios from "axios";
import { toastControl } from "@/utils/toast";
import DiffMatchPatch from 'diff-match-patch';


const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE

export const savingEntry = async (editorContent: string) => {
    const toastId = toastControl("loading", "Creating Entry...");
    try {
        await axios.post(`${apiBaseURL}createEntry/`, { content: editorContent })
        toastControl("success", "Entry created Successfull!", toastId);
        return true;
    }
    catch (error: any) {
        console.error("Error creating content:", error);
        toastControl("error", "Entry creation failed!", toastId);
        return false;
    }
}

export const updateEntry = async (diff: string) => {
    const toastId = toastControl("loading", "Saving content...");
    try {
        await axios.post(`${apiBaseURL}updateEntry/`, { content: diff })
        toastControl("success", "Save Successfull!", toastId);
        return true;
    }
    catch (error: any) {
        console.error("Error saving content:", error);
        toastControl("error", "Save failed!", toastId);
        return false;
    }
}


export function generateDiff(oldHTML: string, newHTML: string): string {
    const dmp = new DiffMatchPatch();

    const diff = dmp.diff_main(oldHTML, newHTML);

    dmp.diff_cleanupEfficiency(diff);

    const patchList = dmp.patch_make(oldHTML, diff);

    return dmp.patch_toText(patchList);
}