import axios from "axios";

export const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE;

export const getAllImages = async () => {
  try {
    const response = await axios.get(`${apiBaseURL}all_images/`);
    console.log("response.data: ",response.data);
    // return listOfObjToListOfString(response.data);
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

const listOfObjToListOfString=(data:any)=>{
    // return data.map((item:any) =>item.url)
}
