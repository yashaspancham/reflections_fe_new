import { toastControl, toasting } from "@/utils/toast";
import { iSImage } from "@/utils/images";
import { api } from "../setUp/setup";

export const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE;
interface uploadresponseT {
    url: string;
    Key: string;
}

export const uploadToS3 = async (file: File) => {
    if (!iSImage(file.name.split(".").pop()?.toLowerCase())) {
        toasting("not an Image", "error");
        return;
    };
    const toastId = toastControl("loading", "uploading image");
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await api.post<uploadresponseT>(
            "http://localhost:8000/api/upload/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        toastControl("success", "Uploading Successfully", toastId);
        return { "key": response.data.Key, "url": response.data.url };
    } catch (error: any) {
        toastControl("error", "Error Uploading Image", toastId);
        console.error(
            "Error uploading file:",
            error.response?.data?.error || error.message
        );
        return;
    }
};


export const getAllImages = async () => {
    try {
        const response = await api.get(`${apiBaseURL}all_images/`);
        return response.data;
    } catch (error) {
        toasting(`Error fetching images: ${error}`, "error");
        return [];
    }
};

export const downloadImage = async (image_url: string) => {
    try {
        const response = await api.get(`${process.env.NEXT_PUBLIC_API_BASE}download_image?url=${encodeURIComponent(image_url)}`, {
            responseType: "blob",
        });

        const blob = response.data;

        toasting("Download Successful", "success");
        return blob;
    } catch (error) {
        toasting("Error downloading image", "error");
        console.error("Error downloading image:", error);
        return;
    }
};



export const delete_iamge = async (image_url: string) => {
    try {
        await api.delete(`${apiBaseURL}delete_image?url=${encodeURIComponent(image_url)}`,
            { method: "DELETE" });
        toasting("Image deleted", "success");
        return true;
    } catch (error) {
        console.error("error: ", error);
        toasting("Failed to delete image", "error");
        return false;
    }

}