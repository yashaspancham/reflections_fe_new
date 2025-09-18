import { toasting } from "@/utils/toast";
import axios from "axios";
const apiBase = `${process.env.NEXT_PUBLIC_API_BASE}tasks/`;
export const getTasks = async (pageNumber: number) => {
    try {
        const response = await axios.get(`${apiBase}get_tasks/`, { params: { page: pageNumber } });
        console.log("getTasks-response: ", response.data);
        return response.data;
    }
    catch (error: any) {
        console.log("Error loading tasks", error);
        toasting("Error loading tasks", "error");
        return [];
    }
}