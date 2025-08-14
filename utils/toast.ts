import { toast,type ToastId } from "react-toastify";

export const toasting = (msg: string, type: string) => {
  if (type === "info") {
    toast.info(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  if (type === "success") {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  if (type === "warning") {
    toast.warning(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  if (type === "error") {
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  if (type === "default") {
    toast(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};


export const toastControl = (type:string, msg?: string, toastId?: ToastId) => {
  if (type === "loading") {
    const id = toast.info(msg || "Loading...", {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      pauseOnHover: true,
      theme: "light",
    });
    return id;
  }

  if (type === "success") {
    toast.update(toastId, {
      render: msg,
      type:"success",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      isLoading: false,
    });
  }

    if (type === "error") {
    toast.update(toastId, {
      render: msg,
      type:"error",
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      isLoading: false,
    });
  }
};