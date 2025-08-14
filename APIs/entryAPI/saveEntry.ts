import axios from "axios";
import { toastControl } from "@/utils/toast";


const api_base_url=process.env.NEXT_PUBLIC_API_BASE

export const saveEntry = async (entryContent: string) => {
  const toastId = toastControl("loading", "Saving content...");
  try {
    const response = await axios.post(
      `${api_base_url}save/`,
      { content: entryContent },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Entry saved successfully:", response.data);
    toastControl("success", "Save Successfull!",toastId);
    return response.data;
  } catch (error: any) {
    toastControl("error", "Save failed!",toastId);
    console.error(
      "Error saving Entry:",
      error.response?.data?.error || error.message
    );
    return null;
  }
};

