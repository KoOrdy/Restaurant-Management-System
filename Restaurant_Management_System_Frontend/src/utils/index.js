// utils/toastUtils.js
import { Bounce, toast } from "react-toastify";

export const showToast = (type, message) => {
  toast[type](message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};

export const truncateText = (text, maxLength = 20, withEllipsis = true) => {
  if (!text) return "N/A";
  return text.length > maxLength
    ? text.slice(0, maxLength) + (withEllipsis ? "..." : "")
    : text;
};

export const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const isImageFile = (file) => file && file.type.startsWith("image/");
