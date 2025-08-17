import { toasting } from "@/utils/toast";
import axios from "axios";

export const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE;
interface uploadresponseT {
    url: string;
    Key: string;
}

export const uploadToS3 = async (file: File, orderId: number) => {
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
        // console.log("Uploaded file URL:", response.data.url);
        return { "presignedURL": response.data.url, "orderID": orderId };
    } catch (error: any) {

        console.error(
            "Error uploading file:",
            error.response?.data?.error || error.message
        );
    }
};


export const getAllImages = async () => {
    try {
        const response = await axios.get(`${apiBaseURL}all_images/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
};

export const downloadImage = async (image_url: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE}download_image?url=${encodeURIComponent(image_url)}`,
            { method: "GET" }
        );
        if (!response.ok) {
            toasting("Download failed", "error");
            return;
        }
        const blob = await response.blob();

        toasting("Download Successful", "success")
        return blob;
    } catch (error) {
        toasting("Error downloading image", "error")
        console.error("Error downloading image:", error);
        return;
    }
}


export const delete_iamge = async (image_url: string) => {
    try {
        const response: any = await axios.delete(`${apiBaseURL}delete_image?url=${encodeURIComponent(image_url)}`,
            { method: "DELETE" });
        toasting("Image deleted", "success");
        return true;
    } catch (error) {
        console.error("error: ", error);
        toasting("Failed to delete image", "error");
        return false;
    }

}