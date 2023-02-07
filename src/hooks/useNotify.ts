import { toast } from "react-toastify";
import { ToastOptions } from "react-toastify/dist/types";

const toastConfig: ToastOptions = {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

export function useNotify() {
  async function successNotify(message: string) {
    toast.success(message, {
      ...toastConfig,
      style: { background: "#00b37e" },
    });
  }

  async function errorNotify(message: string) {
    toast.error(message, { ...toastConfig, style: { background: "#f75a68" } });
  }

  return { successNotify, errorNotify };
}
