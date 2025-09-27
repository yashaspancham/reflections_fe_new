import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(config => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    //  console.log("Interceptor caught an error:", error);
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const refresh =localStorage.getItem("refresh");
          console.log("Calling refresh token endpoint");
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}users/refresh_access/`, { refresh });
          const newAccess = res.data.access;
          const newRefresh=res.data.refresh;
          localStorage.setItem("access", newAccess);
          if(newRefresh){
            localStorage.setItem("refresh", newRefresh);
          }

          api.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
          processQueue(null, newAccess);
          resolve(api(originalRequest));
        } catch (err) {
          console.log("err: ", err);
          if (err && err.status === 401) {
            window.location.href = "/sign-in";
          }
          processQueue(err, null);
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });
    }

    return Promise.reject(error);
  });