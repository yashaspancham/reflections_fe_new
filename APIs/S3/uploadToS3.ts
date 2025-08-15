import axios from "axios";

interface uploadresponseT {
  url: string;
  Key: string;
}

export const uploadToS3 = async (file: File,orderId:number) => {
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
    return {"presignedURL":response.data.url, "orderID":orderId};
  } catch (error: any) {

    console.error(
      "Error uploading file:",
      error.response?.data?.error || error.message
    );
  }
};
