import { toasting } from "@/utils/toast";
import axios from "axios";

const api_base = `${process.env.NEXT_PUBLIC_API_BASE}users/`


export const signup = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${api_base}signup/`, { email, password });
    toasting("Account created", "success");
    return response.data;
  } catch (err: any) {
    toasting(`Error creating account ${err}`, "error");
    console.log(err.response?.data?.error || "Signup failed");
    return null;
  }
};


export const signin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${api_base}signin/`, { email, password });
    toasting("Signin success", "success");
    console.log("signin-response: ", response.data);
    localStorage.setItem("access", response.data.tokens.access);
    localStorage.setItem("refresh", response.data.tokens.refresh);
    localStorage.setItem("user_data",response.data.user_data)
    return response.data.tokens;
  } catch (err: any) {
    console.log(err.response?.data?.error || "Signin failed");
    return null;
  }
};
