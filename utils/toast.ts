import { toast,type ToastId } from "react-toastify";

export const toasting = (msg: string, type: string) => {
  if (type === "info") {
    toast.info(msg, {
      position: "top-right",
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
      position: "top-right",
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
      position: "top-right",
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
      position: "top-right",
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
      position: "top-right",
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

let currentToastId: ToastId | null = null;

export const toastControl = (type: "loading" | "success" | "error", msg?: string, toastId?: ToastId): ToastId | undefined => {
  if (type === "loading") {
    const id = toast.info(msg || "Loading...", {
      position: "top-center",
      autoClose: false, // keep it open
      closeOnClick: false,
      draggable: false,
      pauseOnHover: true,
      theme: "light",
    });
    return id;
  }

  if ((type === "success" || type === "error") && toastId) {
    toast.update(toastId, {
      render: msg || (type === "success" ? "Success!" : "Error!"),
      type,
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
      isLoading: false, // stop loading state
    });
  }
};