import axios from "axios";
import { toasting } from "../toast";
import { uploadToS3 } from "@/APIs/S3/s3";
import { toastControl } from "@/utils/toast";

const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE

export const savingEntry = async (editorContent: string, stagedImages: { file: File; preview: string }[]) => {
    const toastId = toastControl("loading", "Saving content...");

    const presignedURLs = await saveImages(stagedImages);
    let html = editorContent;
    presignedURLs.forEach((item, index) => {
        const localSrc = stagedImages[index].preview;
        html = html.replace(localSrc, item?.presignedURL || localSrc);
    });
    try {
        await axios.post(`${apiBaseURL}save/`, { content: html })
        toastControl("success", "Save Successfull!",toastId);
    }
    catch (error: any) {
        console.error("Error saving content:", error);
        toastControl("error", "Save failed!",toastId);
    }
}

const saveImages = async (stagedImages: { file: File; preview: string }[]) => {
    try {
        const uploadPromises = stagedImages.map((img, orderId: number) => {
            return uploadToS3(img.file, orderId)
        })
        const presignedURLs = await Promise.all(uploadPromises);
        // console.log("presignedURLs: ", presignedURLs);
        return presignedURLs;
    }
    catch (error) {
        toasting("Error saving images", "error");
        console.error("Error saving images: ", error);
        return [];
    }
}
