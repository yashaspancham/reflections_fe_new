import axios from "axios";
import { toastControl } from "@/utils/toast";

interface uploadresponseT {
  url: string;
  Key: string;
}

export const uploadToS3 = async (file: File) => {
//   const toastId = toastControl("loading", "Uploading image...");
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post<uploadresponseT>(
      "http://localhost:8000/api/upload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Uploaded file URL:", response.data.url);
    // toastControl("success", "Image uploaded!",toastId);
    return response.data.url;
  } catch (error: any) {
    // toastControl("error", "Upload failed!",toastId);

    console.error(
      "Error uploading file:",
      error.response?.data?.error || error.message
    );
  }
};
