import { toasting } from "./toast"

export const writeSortEntriesInLocalStore = (sort: string) => {
    try {
        localStorage.setItem("reflections2834_sort_store", sort)
    }
    catch (error: any) {
        console.error("error in localStore: ", error);
        toasting("Error in localStore", "error");
    }
}

export const readSortEntriesInLocalStore = async () => {
    try {
        return localStorage.getItem("reflections2834_sort_store") || "-createdAt";
    }
    catch (error: any) {
        console.error("error in localStore: ", error);
        toasting("Error in localStore", "error");
        return "-createdAt"
    }
}